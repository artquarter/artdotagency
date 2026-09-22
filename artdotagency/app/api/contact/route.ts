import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const HUBSPOT_BASE_URL = "https://api.hubapi.com";
const MAX_BODY_BYTES = 40_000;
const REQUEST_TIMEOUT_MS = 10_000;
const NOTE_TO_CONTACT_ASSOCIATION_ID = 202;

class InputError extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message);
  }
}

class HubSpotError extends Error {
  constructor(
    readonly stage: string,
    readonly status: number,
  ) {
    super("HubSpot request failed");
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function textField(
  value: unknown,
  label: string,
  maxLength: number,
  required = false,
): string {
  if (value === undefined || value === null) {
    if (required) {
      throw new InputError(`Please enter ${label}.`);
    }
    return "";
  }

  if (typeof value !== "string") {
    throw new InputError(`Invalid ${label}.`);
  }

  const text = value.trim();

  if (required && !text) {
    throw new InputError(`Please enter ${label}.`);
  }

  if (text.length > maxLength) {
    throw new InputError(
      `${label} must contain no more than ${maxLength} characters.`,
    );
  }

  // Allow tabs and line breaks, but reject other control characters.
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(text)) {
    throw new InputError(`Invalid characters in ${label}.`);
  }

  return text;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\r\n|\r|\n/g, "<br />");
}

async function readPayload(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    throw new InputError("Please submit JSON data.", 415);
  }

  if (!request.body) {
    throw new InputError("The submission is empty.");
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      size += value.byteLength;

      if (size > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new InputError("The submission is too large.", 413);
      }

      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  let payload: unknown;

  try {
    payload = JSON.parse(text);
  } catch {
    throw new InputError("The submission contains invalid JSON.");
  }

  if (!isObject(payload)) {
    throw new InputError("The submission must be a JSON object.");
  }

  return payload;
}

async function hubspotRequest(
  token: string,
  path: string,
  method: "GET" | "POST" | "PATCH",
  stage: string,
  body?: unknown,
): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(`${HUBSPOT_BASE_URL}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(body !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    // Never expose HubSpot's response body to the browser or logs.
    if (!response.ok) {
      throw new HubSpotError(stage, response.status);
    }

    const result: unknown = await response.json();

    if (!isObject(result)) {
      throw new HubSpotError(stage, 502);
    }

    return result;
  } catch (error) {
    if (error instanceof HubSpotError) {
      throw error;
    }

    const timedOut =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");

    throw new HubSpotError(stage, timedOut ? 504 : 502);
  }
}

function recordId(
  result: Record<string, unknown>,
  stage: string,
): string {
  if (
    typeof result.id !== "string" ||
    !/^\d+$/.test(result.id) ||
    result.archived === true
  ) {
    throw new HubSpotError(stage, 502);
  }

  return result.id;
}

export async function POST(request: Request) {
  const reference = randomUUID();

  try {
    const payload = await readPayload(request);

    const name = textField(payload.name, "your name", 200, true);
    const organisation = textField(
      payload.organisation,
      "your organisation",
      200,
      true,
    );
    const email = textField(
      payload.email,
      "your email address",
      254,
      true,
    ).toLowerCase();

    const phone = textField(payload.phone, "phone number", 50);

    const typeOfSupport = textField(
      payload.typeOfSupport,
      "type of support",
      200,
    );
    const budget = textField(payload.budget, "budget", 200);
    const deadline = textField(payload.deadline, "deadline", 200);

    // Supports both the updated form and your current "goals" field.
    const message = textField(
      payload.message ?? payload.goals,
      "your message",
      5_000,
      true,
    );

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
      throw new InputError("Please enter a valid email address.");
    }

    const token = process.env.HUBSPOT_ACCESS_TOKEN?.trim();

    if (!token) {
      console.error("Contact form configuration error", { reference });

      return NextResponse.json(
        {
          success: false,
          error: "The enquiry form is temporarily unavailable.",
          reference,
        },
        { status: 503 },
      );
    }

    const receivedAt = new Date().toISOString();

    const fields: Array<[string, string]> = [
      ["Name", name],
      ["Organisation", organisation],
      ["Email", email],
      ["Phone", phone || "Not specified"],
      ["Type of support", typeOfSupport || "Not specified"],
      ["Budget", budget || "Not specified"],
      ["Deadline", deadline || "Not specified"],
      ["Message", message],
    ];

    const noteBody = [
      "<h2>Artdot Agency website enquiry</h2>",
      `<p><strong>Received</strong><br />${receivedAt}</p>`,
      ...fields.map(
        ([label, value]) =>
          `<p><strong>${label}</strong><br />${escapeHtml(value)}</p>`,
      ),
      `<p><strong>Submission reference</strong><br />${reference}</p>`,
    ].join("");

    if (noteBody.length > 65_536) {
      throw new InputError("The submission is too large.", 413);
    }

    let contactId: string;
    
    // Standard HubSpot properties. Custom properties will cause 400 Bad Request if not created in HubSpot.
    const contactProperties = {
      email,
      firstname: name,
      company: organisation,
      phone: phone,
    };

    try {
      const contact = await hubspotRequest(
        token,
        "/crm/v3/objects/contacts",
        "POST",
        "create_contact",
        {
          properties: contactProperties,
        },
      );

      contactId = recordId(contact, "create_contact");
    } catch (error) {
      if (!(error instanceof HubSpotError) || error.status !== 409) {
        throw error;
      }

      // Retrieve by email instead of parsing an ID from an error message.
      const existingContact = await hubspotRequest(
        token,
        `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
        "GET",
        "find_existing_contact",
      );

      contactId = recordId(existingContact, "find_existing_contact");
      
      // Update existing contact with new properties so their data isn't lost
      try {
        await hubspotRequest(
          token,
          `/crm/v3/objects/contacts/${contactId}`,
          "PATCH",
          "update_contact",
          {
            properties: contactProperties,
          },
        );
      } catch (updateError) {
        console.error("Failed to update existing contact properties", updateError);
        // Continue to note creation even if property update fails
      }
    }

    // Create the note and its contact association in one request.
    const note = await hubspotRequest(
      token,
      "/crm/v3/objects/notes",
      "POST",
      "create_associated_note",
      {
        properties: {
          hs_timestamp: receivedAt,
          hs_note_body: noteBody,
        },
        associations: [
          {
            to: { id: contactId },
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: NOTE_TO_CONTACT_ASSOCIATION_ID,
              },
            ],
          },
        ],
      },
    );

    recordId(note, "create_associated_note");

    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof InputError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status },
      );
    }

    if (error instanceof HubSpotError) {
      console.error("Contact form HubSpot failure", {
        reference,
        stage: error.stage,
        upstreamStatus: error.status,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "We could not confirm receipt of your enquiry. Please try again shortly.",
          reference,
        },
        { status: error.status === 504 ? 504 : 502 },
      );
    }

    console.error("Unexpected contact form failure", { reference });

    return NextResponse.json(
      {
        success: false,
        error: "We could not process your enquiry. Please try again shortly.",
        reference,
      },
      { status: 500 },
    );
  }
}
