# abhinavrejaportfolio.vercel.app

Personal site of Abhinav Reja. A home page (hero with numbers from real work,
selected work, experience, about, contact) plus a case study page per project at
`/work/<slug>`. Every project card is a small working demo of the real thing,
built in React with no backend: a canvas sign placement map, a scripted claims
chat, a live Flask to Spring Boot migration, AWS latency bars, and so on.

## Stack

Vite, React 18, react-router-dom, plain CSS. `@emailjs/browser` powers the
contact form. No UI kit, no animation library; demos use canvas, CSS, and timers.

## Editing content

Everything shown on the page lives in `src/data/`:

| File | What it holds |
|---|---|
| `profile.js` | name, location, links, headline, intro paragraphs, "Now" list |
| `experience.js` | jobs, newest first |
| `projects.js` | `PROJECTS` (slug, card text, `demo` key, case study) and `EARLIER` |
| `education.js` | degrees |
| `skills.js` | skill groups |

The components in `src/components/` only render that data. Demos live in
`src/components/demos/` and are picked by the `demo` key through `demos/index.js`.

Branches: `main` is the original site, `minimal-backup` is a plain one column
version, `redesign-v2` is this one. Keep
`public/Abhinav_Reja_Resume.pdf` in step with it.

## Running locally

```bash
npm install
npm run dev
```

The contact form needs an `.env` with `VITE_EMAILJS_SERVICE_ID`,
`VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`. Without them the
form reports a send failure and points visitors to the email address instead.

## Deploying

Vercel builds from `main` with `npm run build` and serves `dist/`
(see `vercel.json`).
