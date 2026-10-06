"use server";

import OpenAI from "openai";
import { supabaseAdmin } from "./lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStrategy(brief: { organisation: string, assets: string, challenge: string, rate?: string }) {
  console.log("[AI] Starting strategy generation...");
  // 1. Fetch real grants from our Supabase database (Phase 1 of RAG)
  console.log("[AI] 1. Fetching grants from Supabase...");
  const { data: activeGrants, error: fetchError } = await supabaseAdmin
    .from("opportunities")
    .select("title, type, description");

  if (fetchError) {
    console.error("Database error fetching grants:", fetchError);
    throw new Error("Failed to load active grants from the database.");
  }

  console.log("[AI] 2. Saving client profile to Supabase...");
  // 2. Save the new client (Organisation) to Supabase so we have a permanent record
  const { data: orgData, error: orgError } = await supabaseAdmin
    .from("organisations")
    .insert([{ 
      name: brief.organisation, 
      assets: brief.assets, 
      challenge: brief.challenge, 
      target_hourly_rate: brief.rate || "Unknown" 
    }])
    .select("id")
    .single();

  if (orgError) {
    console.error("Database error creating organisation:", orgError);
    throw new Error("Failed to create client record.");
  }

  const organisationId = orgData.id;

  // 3. Format the active grants into a readable string for the AI
  const grantsKnowledgeBase = activeGrants
    .map((g, index) => `${index + 1}. "${g.title}" (${g.type}) - ${g.description}`)
    .join("\n");

  const prompt = `
You are the proprietary AI engine for Artdot Agency, an elite consultancy.
Tone: Extremely dry, direct, and corporate. McKinsey style. Do NOT use words like delve, tapestry, robust, testament, seamless, synergy, bustling, landscape, overarching, beacon, or unlock. Keep it strictly professional.

We have a strict database of currently active grants/opportunities. You must ONLY suggest opportunities from this list:
${grantsKnowledgeBase}

Client Profile:
- Organisation: ${brief.organisation}
- Available Spaces: ${brief.assets}
- Main Challenge (Needs): ${brief.challenge}
- Target Rate: ${brief.rate || "Unknown"}

Evaluate the client profile strictly against the criteria of each active opportunity (Location, Space, Needs vs Eligibility Rules, Target Outcomes, Eligible Spaces/Costs, Exclusions).
Do NOT guess. Perform a rule-by-rule cross-reference (e.g. if the client needs capital repairs but the fund excludes capital costs, the match fails).

Analyze the client profile against our active opportunities. 
Return a strict JSON object matching this schema exactly:
{
  "diagnostic": {
    "priorityTitle": "A concise title for what to fix first",
    "priorityDescription": "One sentence describing the immediate priority based on gaps",
    "evidenceGaps": ["gap 1 string", "gap 2 string"]
  },
  "opportunities": [
    { "id": 1, "title": "Exact Opportunity Name from database", "type": "Funding or Commercial", "score": 90, "status": "GREEN LIGHT REQUIRED", "shortDescription": "1-sentence summary of why this fits", "nextSteps": "What the client should do next" },
    { "id": 2, "title": "Exact Opportunity Name 2 from database", "type": "Funding or Commercial", "score": 85, "status": "RECOMMENDED", "shortDescription": "1-sentence summary of why this fits", "nextSteps": "What the client should do next" }
  ],
  "plan": [
    { "priority": 1, "title": "First immediate actionable task directly related to Option 1", "owner": "Appropriate role (e.g. Operations Lead or Bid Writer), approved by Jordan", "status": "Green light required" },
    { "priority": 2, "title": "Second practical step", "owner": "Appropriate role", "status": "In progress" },
    { "priority": 3, "title": "Third setup step", "owner": "Appropriate role", "status": "Identified" }
  ]
}

Ensure you provide exactly 2 evidence gaps based on the client's challenge (these must be specific missing documents, datasets, or financial metrics the client needs to provide to win), exactly 2 relevant opportunities from the database above (with a calculated fit score out of 100), and exactly 3 plan tasks prioritized for a 90-day execution.
`;

  try {
    console.log("[AI] 3. Calling OpenAI with prompt...");
    console.log("\n--- AI PROMPT ---");
    console.log(prompt);
    console.log("-----------------\n");
  // 4. Generate the customized strategy using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content returned from OpenAI");
    
    const generatedData = JSON.parse(content);
    console.log("[AI] 4. Received successful response from OpenAI.");
    console.log("\n--- AI RESPONSE ---");
    console.log(content);
    console.log("-------------------\n");
    
    console.log("[AI] 5. Saving generated strategy to Supabase...");
    // 5. Permanently save the AI's generated output into our Database
    
    // Insert Evidence Gaps
    const gapsToInsert = generatedData.diagnostic.evidenceGaps.map((gap: string) => ({
      organisation_id: organisationId,
      gap_text: gap,
      state: 'Evidence required'
    }));
    await supabaseAdmin.from("evidence_gaps").insert(gapsToInsert);

    // Insert 90-Day Plan Tasks
    const tasksToInsert = generatedData.plan.map((task: any) => ({
      organisation_id: organisationId,
      priority: task.priority,
      title: task.title,
      owner: task.owner,
      status: task.status,
      complexity: 'Class B' // Defaulting to B as per P0 spec
    }));
    await supabaseAdmin.from("tasks").insert(tasksToInsert);

    console.log("[AI] Done! Returning data to frontend.");
    // 6. Return the data to the frontend so it immediately renders
    return generatedData;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to generate strategy");
  }
}
