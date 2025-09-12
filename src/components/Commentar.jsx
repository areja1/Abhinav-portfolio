// src/components/Commentar.jsx
import { useRef, useState, useEffect } from "react";

export default function Komentar() {
  // sanity to prove this file is the one rendering
  useEffect(() => console.log("Commentar: EPHEMERAL loaded"), []);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [comments, setComments] = useState([]);
  const listEndRef = useRef(null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return;

    const newComment = { id: Date.now(), name, email, message, ts: new Date().toISOString() };
    setComments((prev) => [...prev, newComment]);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => listEndRef.current?.scrollIntoView({ behavior: "smooth" }), 30);
  };

  return (
    <div className="p-6" data-testid="ephemeral-comments">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Your Name</label>
            <input name="name" value={form.name} onChange={onChange}
                   placeholder="Your full name"
                   className="w-full bg-transparent py-2 px-3 rounded-lg border border-white/10 outline-none" required />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange}
                   placeholder="name@example.com"
                   className="w-full bg-transparent py-2 px-3 rounded-lg border border-white/10 outline-none" required />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Message</label>
          <textarea name="message" value={form.message} onChange={onChange}
                    placeholder="Say something nice…"
                    className="w-full bg-transparent py-2 px-3 rounded-lg border border-white/10 outline-none h-28 resize-none" required />
        </div>

        <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white">
          Post Comment
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-400">Be the first to comment.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-gray-400">{new Date(c.ts).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{c.message}</p>
              </li>
            ))}
            <li ref={listEndRef} />
          </ul>
        )}
      </div>
    </div>
  );
}
