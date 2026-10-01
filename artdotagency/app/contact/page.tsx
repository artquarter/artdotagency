"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Footer from "../component /Footer";
import Cursor from "../component /Cursor";
import ContactParticles from "../component /ContactParticles";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full bg-black/50 border border-white/10 px-4 py-3 text-white " +
  "focus:outline-none focus:border-neonlime transition-colors";

const labelClass =
  "block font-kamerick text-xs text-gray-400 lowercase " +
  "tracking-widest mb-2";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const value = (key: string): string => {
      const entry = formData.get(key);
      return typeof entry === "string" ? entry.trim() : "";
    };

    const payload = {
      name: value("name"),
      organisation: value("organisation"),
      email: value("email"),
      message: value("message"),
    };

    submittingRef.current = true;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: unknown = await response.json().catch(() => null);

      const body =
        typeof result === "object" &&
        result !== null &&
        !Array.isArray(result)
          ? (result as Record<string, unknown>)
          : null;

      if (!response.ok || body?.success !== true) {
        const message =
          typeof body?.error === "string"
            ? body.error
            : "We could not confirm receipt of your enquiry. Please try again shortly.";

        const reference =
          typeof body?.reference === "string"
            ? ` Reference ${body.reference}.`
            : "";

        setErrorMessage(message + reference);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(
        "We could not confirm receipt of your enquiry. Check your connection and try again.",
      );
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <main className="bg-void min-h-screen text-white relative overflow-hidden">
      <Cursor />
      <ContactParticles />

      <div className="container mx-auto px-6 py-32 relative z-10 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="font-kamerick text-4xl md:text-6xl font-bold mb-6 tracking-tight lowercase">
              discuss a <span className="text-[#CCFF00]">project</span>
            </h1>
            <p className="font-kamerick text-gray-400 text-sm md:text-lg lowercase tracking-widest max-w-xl mx-auto">
              tell us what you are trying to achieve. we aim to respond within 24 hours.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              role="status"
              className="bg-[#0F0F0F] border border-[#CCFF00]/30 text-[#CCFF00] p-12 text-center"
            >
              <h2 className="font-kamerick text-3xl font-bold mb-4 lowercase">
                thank you
              </h2>
              <p className="font-kamerick text-gray-400 tracking-widest lowercase text-sm">
                Your enquiry has been received. We’ll review your brief and
                get in touch to discuss the next steps.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              aria-busy={status === "submitting"}
              className="bg-[#0F0F0F] border border-white/5 p-8 md:p-12"
            >
              <fieldset
                disabled={status === "submitting"}
                className="min-w-0 space-y-8"
              >
                <legend className="sr-only">Project enquiry</legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      your name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={200}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="organisation" className={labelClass}>
                      organisation (optional)
                    </label>
                    <input
                      id="organisation"
                      name="organisation"
                      type="text"
                      autoComplete="organization"
                      maxLength={200}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    what are you trying to achieve? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={5000}
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="text-red-400 font-kamerick text-sm text-center"
                  >
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full px-8 py-5 bg-neonlime text-black font-kamerick text-sm font-bold lowercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                  {status === "submitting"
                    ? "submitting..."
                    : "discuss a project"}
                </button>
              </fieldset>
            </motion.form>
          )}
        </div>
      </div>

      <div className="relative z-10 bg-void">
        <Footer />
      </div>
    </main>
  );
}
