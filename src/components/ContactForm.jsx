import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Send, Loader2 } from "lucide-react";

const TO_EMAIL = "abhinavreja200@gmail.com";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(null); // null | "success" | "error"
  const inFlight = useRef(false);      // ✅ prevent duplicate sends
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
    bot_field: "", // honeypot
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.from_name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.bot_field) return; // spam

    // ✅ HARD GUARD: if a send is already in progress, ignore this submit
    if (inFlight.current || sending) return;
    inFlight.current = true;

    const err = validate();
    if (err) {
      alert(err);
      inFlight.current = false;
      return;
    }

    setSending(true);
    setOk(null);
    try {
      const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const pubkey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(
        service,
        template,
        { ...form, to_email: TO_EMAIL },
        { publicKey: pubkey }
      );

      setOk("success");
      setForm({ from_name: "", from_email: "", subject: "", message: "", bot_field: "" });
    } catch (err2) {
      console.error(err2);
      setOk("error");
    } finally {
      setSending(false);
      inFlight.current = false; // ✅ allow next submit only after completion
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10 p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10 border border-white/10">
            <Mail className="w-5 h-5 text-blue-300" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Contact Me
          </h2>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 md:gap-5">
          {/* honeypot */}
          <input
            type="text"
            name="bot_field"
            value={form.bot_field}
            onChange={onChange}
            className="hidden"
            autoComplete="off"
            tabIndex={-1}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm text-white/70">Your Name</label>
              <input
                name="from_name"
                value={form.from_name}
                onChange={onChange}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="Jane Doe"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-white/70">Your Email</label>
              <input
                name="from_email"
                value={form.from_email}
                onChange={onChange}
                type="email"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-white/70">Subject (optional)</label>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              placeholder="About your portfolio..."
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-white/70">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40 resize-y"
              placeholder="Write your message..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 transition-all"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{sending ? "Sending..." : "Send Message"}</span>
            </button>

            <a
              href={`mailto:${TO_EMAIL}?subject=${encodeURIComponent(form.subject || "Hello")}&body=${encodeURIComponent(
                `${form.message}\n\n— ${form.from_name} <${form.from_email}>`
              )}`}
              className="text-blue-300/90 hover:text-blue-200 underline underline-offset-4"
            >
              Or email me directly
            </a>

            {ok === "success" && <span className="text-green-300/90">Thanks! Your message has been sent.</span>}
            {ok === "error" && <span className="text-red-300/90">Couldn’t send right now. Please use the email link.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
