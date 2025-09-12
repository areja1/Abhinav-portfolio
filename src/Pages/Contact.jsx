import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Send, Loader2, MessageSquare } from "lucide-react";
import CommentsEphemeral from "../components/CommentsEphemeral";

const TO_EMAIL = "abhinavreja200@gmail.com";

export default function Contact() {
  // -------- Email form state (left)
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // null | "ok" | "err"

  // Auto-reply template id comes from your .env (Vite)
  // VITE_EMAILJS_TEMPLATE_AUTOREPLY_ID should be set to your auto-reply template in EmailJS
  const EMAILJS_TEMPLATE_AUTOREPLY_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY_ID;

  // -------- EmailJS submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());
    if (data.bot_field) return; // honeypot

    const from_name = (data.from_name || "").trim();
    const from_email = (data.from_email || "").trim();
    const subject = (data.subject || "").trim();
    const message = (data.message || "").trim();

    if (!from_name) return alert("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email))
      return alert("Please enter a valid email.");
    if (!message) return alert("Please enter a message.");

    setSending(true);
    setStatus(null);
    try {
      // 1) Send the message to you (owner/inbox template)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          // preferred keys for your template
          from_name,
          from_email,
          subject,
          message,
          to_email: TO_EMAIL,
          time: new Date().toLocaleString(),

          // compatibility keys (if your template still uses these)
          name: from_name,
          email: from_email,
          title: subject,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      // 2) Auto-reply to the sender (only if env var is present)
      if (EMAILJS_TEMPLATE_AUTOREPLY_ID) {
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_AUTOREPLY_ID,
            {
              // Make sure your EmailJS auto-reply template "To" is set to {{to_email}}
              to_name: from_name,
              to_email: from_email,
              subject,
              message,
              // optional extras for your template body
              reply_to: TO_EMAIL,
              received_time: new Date().toLocaleString(),
            },
            { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
          );
        } catch (autoErr) {
          // Don't fail the whole operation if auto-reply fails
          console.error("Auto-reply send error:", autoErr);
        }
      }

      setStatus("ok");
      formEl.reset();
    } catch (err) {
      console.error("EmailJS send error:", err);
      alert(
        err?.text || err?.message || "Couldn’t send right now. Please use the email link."
      );
      setStatus("err");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (d) =>
    d ? d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "pending…";

  return (
    <section id="contact" className="relative py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Got a question? Send me a message.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 items-start [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
          {/* LEFT: Get in Touch (EmailJS) */}
          <div className="relative rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6 min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10">
                <Mail className="w-5 h-5 text-blue-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Get in Touch
              </h3>
            </div>

            <form onSubmit={handleEmailSubmit} className="grid gap-4">
              {/* Honeypot */}
              <input
                type="text"
                name="bot_field"
                className="hidden"
                autoComplete="off"
                tabIndex={-1}
              />

              <div className="grid items-start gap-6 md:gap-8 [grid-template-columns:repeat(auto-fit,minmax(360px,1fr))]">
                <div className="grid gap-2">
                  <label className="text-xs text-white/70">Your Name</label>
                  <input
                    name="from_name"
                    placeholder="Jane Doe"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs text-white/70">Your Email</label>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="jane@example.com"
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-xs text-white/70">Subject (optional)</label>
                <input
                  name="subject"
                  placeholder="About your portfolio..."
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs text-white/70">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Write your message..."
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 resize-y"
                  required
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 transition-all"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{sending ? "Sending..." : "Send Message"}</span>
                </button>

                <a
                  href={`mailto:${TO_EMAIL}?subject=${encodeURIComponent("Hello")}`}
                  className="text-blue-300/90 hover:text-blue-200 underline underline-offset-4"
                >
                  Or email me directly
                </a>

                {status === "ok" && (
                  <span className="text-green-300/90">
                    Thanks! Your message has been sent.
                  </span>
                )}
                {status === "err" && (
                  <span className="text-red-300/90">
                    Couldn’t send right now. Please use the email link.
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT: Comments (ephemeral, no Firestore) */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6 min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10">
                <MessageSquare className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Comments
              </h3>
            </div>

            {/* Ephemeral comments widget */}
            <CommentsEphemeral />
          </div>
        </div>
      </div>
    </section>
  );
}
