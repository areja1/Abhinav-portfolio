// src/components/CommentsEphemeral.jsx
import { useRef, useState, useEffect } from "react";

export default function CommentsEphemeral() {
  useEffect(() => console.log("CommentsEphemeral ACTIVE"), []);
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

  // white text + white caret (blinker) + focus ring
  const inputCls =
    "w-full w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 " +
    "text-white placeholder-white/40 caret-white " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500/40";

  return (
    <div className="p-6" data-testid="comments-ephemeral">
      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Two-row grid:
            Row 1 -> [Name] [Email]
            Row 2 -> [   ]  [Message]   (Message aligns under Email and matches width)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Row 1, Col 1: Name */}
          <div>
            <label className="block text-xs text-white/70 mb-1">Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your full name"
              className={inputCls}
              required
            />
          </div>

          {/* Row 1, Col 2: Email */}
          <div>
            <label className="block text-xs text-white/70 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="name@example.com"
              className={inputCls}
              required
            />
          </div>

          

          {/* Message spans both columns on md+ */}
          <div className="md:col-span-2">
            <label className="block text-xs text-white/70 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Say something nice..."
              rows={3}
              className={inputCls + " resize-y"}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 transition-all"
        >
          Post Comment
        </button>
      </form>

      {/* List */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-white/80 mb-2">Comments (ephemeral)</h3>
        {comments.length === 0 ? (
          <p className="text-sm text-slate-400">Be the first to comment.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{c.name}</span>
                  <span className="text-xs text-gray-400">{new Date(c.ts).toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-400 break-words">{c.email}</div>
+                <p className="mt-2 text-slate-200 whitespace-pre-wrap break-words">{c.message}</p>
              </li>
            ))}
            <li ref={listEndRef} />
          </ul>
        )}
      </div>
    </div>
  );
}
