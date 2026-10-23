# abhinavrejaportfolio.vercel.app

Personal site of Abhinav Reja. One page: who I am, what I am doing now, work
history, projects, education and skills, and a contact form.

## Stack

Vite, React 18, plain CSS. The only runtime dependency beyond React is
`@emailjs/browser` for the contact form. No UI kit, no animation library.

## Editing content

Everything shown on the page lives in `src/data/`:

| File | What it holds |
|---|---|
| `profile.js` | name, location, links, headline, intro paragraphs, "Now" list |
| `experience.js` | jobs, newest first |
| `projects.js` | `PROJECTS` (full entries) and `EARLIER` (compact list) |
| `education.js` | degrees |
| `skills.js` | skill groups |

The components in `src/components/` only render that data. Keep
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
