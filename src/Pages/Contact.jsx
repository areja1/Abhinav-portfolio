import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Send, Loader2, MessageSquare } from "lucide-react";
import CommentsEphemeral from "../components/CommentsEphemeral";

const TO_EMAIL = "abhinavreja2000@gmail.com";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // null | "ok" | "err"

  const SERVICE_ID   = (import.meta.env.VITE_EMAILJS_SERVICE_ID || "").trim();
  const TEMPLATE_ID  = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "").trim();
  const AUTOREPLY_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY_ID || "").trim();
  const PUBLIC_KEY   = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "").trim();

  useEffect(() => {
    if (!PUBLIC_KEY) return;
    try { emailjs.init({ publicKey: PUBLIC_KEY }); } catch { try { emailjs.init(PUBLIC_KEY); } catch {} }
    // Optional: confirm the key is present
    console.debug("EmailJS key prefix:", PUBLIC_KEY.slice(0, 6));
  }, [PUBLIC_KEY]);

  const assertEnv = () => {
    const missing = [];
    if (!SERVICE_ID)   missing.push("VITE_EMAILJS_SERVICE_ID");
    if (!TEMPLATE_ID)  missing.push("VITE_EMAILJS_TEMPLATE_ID");
    if (!AUTOREPLY_ID) missing.push("VITE_EMAILJS_TEMPLATE_AUTOREPLY_ID");
    if (!PUBLIC_KEY)   missing.push("VITE_EMAILJS_PUBLIC_KEY");
    if (missing.length) throw new Error("Missing EmailJS env vars: " + missing.join(", "));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());
    if (data.bot_field) return;

    const from_name  = (data.from_name  || "").trim();
    const from_email = (data.from_email || "").trim();
    const subjectRaw = (data.subject || "").trim();
    const subject    = subjectRaw || "General inquiry";
    const message    = (data.message    || "").trim();

    if (!from_name) return alert("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) return alert("Please enter a valid email.");
    if (!message) return alert("Please enter a message.");

    setSending(true);
    setStatus(null);

    try {
      assertEnv();

      // 1) Send to YOU
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // sender info
          from_name,
          from_email,
          name: from_name,        // alias
          email: from_email,      // alias

          
          subject,                // e.g. subjectRaw || "General inquiry"
          title: subject,         // alias

          // content
          message,
          time: new Date().toLocaleString(),

          // routing
          to_email: TO_EMAIL,     // if your template uses {{to_email}}
          to: TO_EMAIL,           // alias if template uses {{to}}
          reply_to: from_email,   // so you can reply to the sender
        },
        { publicKey: PUBLIC_KEY }
      );


      // 2) Auto-reply to SENDER
      await emailjs.send(
        SERVICE_ID,
        AUTOREPLY_ID,
        {
          // who to send to (the visitor)
          to_email: from_email,   // matches {{to_email}}
          to: from_email,         // alias if template uses {{to}}

          // names + subject
          to_name: from_name,     // {{to_name}}
          name: from_name,        // alias {{name}}
          subject,                // non-empty (same fallback as above)
          title: subject,         // alias {{title}}

          // message + reply routing
          message,
          reply_to: TO_EMAIL,     // replies go back to you

          // optional branding in template
          from_name: "Abhinav Reja",
        },
        { publicKey: PUBLIC_KEY }
      );


      setStatus("ok");
      formEl.reset();
    } catch (err) {
      console.error("EmailJS send error:", err);
      alert(err?.text || err?.message || "Couldn’t send right now. Please use the email link.");
      setStatus("err");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-10 md:py-14 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="mt-1 text-sm text-slate-400">Got a question? Send me a message.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* LEFT: form */}
          <div className="relative rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6 min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10">
                <Mail className="w-5 h-5 text-blue-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">Get in Touch</h3>
            </div>

            <form onSubmit={handleEmailSubmit} className="grid gap-4">
              <input type="text" name="bot_field" className="hidden" autoComplete="off" tabIndex={-1} />

              <div className="grid items-start gap-6 md:gap-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                <div className="grid gap-2">
                  <label className="text-xs text-white/70">Your Name</label>
                  <input name="from_name" placeholder="Jane Doe" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs text-white/70">Your Email</label>
                  <input type="email" name="from_email" placeholder="jane@example.com" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40" required />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-xs text-white/70">Subject (optional)</label>
                <input name="subject" placeholder="About your portfolio…" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40" />
              </div>

              <div className="grid gap-2">
                <label className="text-xs text-white/70">Message</label>
                <textarea name="message" rows={5} placeholder="Write your message…" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 resize-y" required />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button type="submit" disabled={sending} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 transition-all">
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>{sending ? "Sending..." : "Send Message"}</span>
                </button>

                <a href={`mailto:${TO_EMAIL}?subject=${encodeURIComponent("Hello")}`} className="text-blue-300/90 hover:text-blue-200 underline underline-offset-4">
                  Or email me directly
                </a>

                {status === "ok" && <span className="text-green-300/90">Thanks! Your message has been sent.</span>}
                {status === "err" && <span className="text-red-300/90">Couldn’t send right now. Please use the email link.</span>}
              </div>
            </form>
          </div>

          {/* RIGHT: comments */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6 min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10">
                <MessageSquare className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">Comments</h3>
            </div>
            <CommentsEphemeral />
          </div>
        </div>
      </div>
    </section>
  );
}
