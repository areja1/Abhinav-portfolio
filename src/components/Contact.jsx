import { useState } from "react";
import emailjs from "@emailjs/browser";
import PROFILE from "../data/profile.js";
import Reveal from "./Reveal.jsx";

const EMPTY = { from_name: "", from_email: "", subject: "", message: "", bot_field: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.from_name.trim()) return "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) return "That email does not look right.";
    if (!form.message.trim()) return "The message is empty.";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.bot_field) return; // honeypot
    const problem = validate();
    if (problem) {
      setError(problem);
      setState("error");
      return;
    }
    setError("");
    setState("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.from_name,
          from_email: form.from_email,
          subject: form.subject || "Message from the portfolio site",
          message: form.message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setForm(EMPTY);
      setState("ok");
    } catch {
      setError(`Sending failed. Email me directly at ${PROFILE.email}.`);
      setState("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>Contact</h2>
          <p>Hiring, a project, or a question about anything above. I reply within a day or two.</p>
        </Reveal>
        <div className="grid">
          <Reveal>
            <p className="big">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </p>
            <p className="note">
              Email is fastest. The form lands in the same inbox. You can also find me on{" "}
              <a className="accent" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>{" "}
              and{" "}
              <a className="accent" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
          </Reveal>
          <Reveal as="form" onSubmit={submit} noValidate delay={100}>
            <div className="row">
              <div className="field">
                <label className="mono" htmlFor="from_name">
                  Name
                </label>
                <input id="from_name" name="from_name" value={form.from_name} onChange={update} autoComplete="name" />
              </div>
              <div className="field">
                <label className="mono" htmlFor="from_email">
                  Email
                </label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  value={form.from_email}
                  onChange={update}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="field">
              <label className="mono" htmlFor="subject">
                Subject (optional)
              </label>
              <input id="subject" name="subject" value={form.subject} onChange={update} />
            </div>
            <div className="field">
              <label className="mono" htmlFor="message">
                Message
              </label>
              <textarea id="message" name="message" value={form.message} onChange={update} />
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="bot_field">Leave this empty</label>
              <input id="bot_field" name="bot_field" tabIndex="-1" value={form.bot_field} onChange={update} />
            </div>
            <div className="actions">
              <button className="btn" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Sending" : "Send message"}
              </button>
              {state === "ok" && <span className="status ok">Sent. Thanks, I will get back to you.</span>}
              {state === "error" && <span className="status">{error}</span>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
