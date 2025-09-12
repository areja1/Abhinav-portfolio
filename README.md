# Abhinav Reja — Portfolio (v5)


---

## ✨ Highlights

* ⚡ **Vite 5** dev server & build pipeline (instant HMR, optimized bundles)
* ⚛️ **React 18** with **React Router v6** for SPA navigation
* 🎨 **Styling** via **Tailwind CSS**, **MUI v6**, and **styled‑components**
* 🪄 **Animations** with **Framer Motion**, **AOS**, **GSAP**, and **React Spring**
* 🧩 **shadcn/ui** & **Headless UI** for accessible building blocks
* 🔥 **Firebase** (optional) for data/auth/storage (if used in your code)
* ✉️ **EmailJS** for contact forms (no server needed)
* 🎞️ **Lottie** and **Spline** for vector/3D experiences
* 🧼 Modern linting with **ESLint 9** and React plugins

> Note: You can mix and match Tailwind, MUI, and styled‑components. Prefer one as the “primary” system and use the others surgically (icons, complex components).

---

## 🧱 Tech Stack

**Core**

* React 18, Vite 5, React Router v6

**UI & Styling**

* Tailwind CSS (+ `tailwind-merge`, `tailwind-scrollbar`)
* MUI v6 (`@mui/material`, `@mui/icons-material`)
* styled‑components v6
* shadcn/ui, Headless UI, Heroicons, lucide-react

**Animation & Effects**

* Framer Motion, AOS, GSAP, React Spring
* Intersection Observer utilities

**Integrations**

* Firebase (optional), EmailJS
* Lottie (`@lottiefiles/dotlottie-react`) & Spline (`@splinetool/react-spline`)

**Tooling**

* ESLint 9 (+ React & hooks plugins), PostCSS, Autoprefixer

---

## 🚀 Getting Started

### 1) Prerequisites

* **Node.js** 18+ (recommended) and **npm**

### 2) Install

```bash
# from repo root
npm ci   # uses package-lock for exact, reproducible install
# or
npm install
```

### 3) Run in dev

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`).

### 4) Build for production

```bash
npm run build
```



```bash
npm run preview
```


## 🧭 Project Structure (suggested)

```
project/
├─ public/                # static assets (favicon, og images, robots.txt, etc.)
├─ src/
│  ├─ assets/             # local images, svgs, lotties
│  ├─ components/         # UI building blocks
│  ├─ features/           # feature-oriented modules (e.g., ContactForm, Projects)
│  ├─ hooks/              # custom hooks
│  ├─ pages/              # route-level components
│  ├─ routes/             # router definitions
│  ├─ styles/             # global.css, tailwind.css, theme.ts
│  ├─ lib/                # api clients, firebase.ts, analytics, utils
│  ├─ App.tsx|tsx         # root component
│  └─ main.tsx            # entry (creates root, strict mode)
├─ index.html             # Vite HTML (set <title> and meta here)
├─ package.json
└─ package-lock.json
```

---

## 🧩 UI Patterns & Tips

* **Tailwind + MUI**: Use Tailwind for fast layout/utility and MUI for complex, accessible components. Wrap MUI with your theme for consistent colors/typography.
* **styled‑components**: Great for component‑scoped styles and dynamic theming; avoid over‑mixing with Tailwind on the same element.
* **Animations**: Prefer **Framer Motion** for in‑view/component transitions; use **GSAP** for timeline‑heavy scenes; **AOS** for simple scroll‑in effects.
* **Accessibility**: Favor Headless UI/shadcn/ui primitives; always label icons and controls.

---

## 📨 Contact Form (EmailJS)

1. Create an EmailJS account and email service/template.
2. Put your **public key**, **service id**, and **template id** into `.env`.
3. In your contact component, initialize EmailJS and send via `emailjs.send` with template params (name, email, message).

---

## 🔥 Firebase (optional)

If you’re persisting data (e.g., visitor messages, project listings):

* Add your Firebase config to `src/lib/firebase.ts` and initialize services you need.
* Import and use in features (auth, firestore, storage, analytics).

---

## 🧹 Linting & Formatting

```bash
npm run lint
```

Configure ESLint rules in `eslint.config.js` or `.eslintrc.*` as preferred.

---


## 📄 License & Credits

* Code: © Abhinav Reja. All rights reserved.
* Libraries: Respect original licenses of dependencies (MUI, Tailwind, etc.).

---

## 🧪 Quick Commands (copy/paste)

```bash
# install exact versions per lockfile
npm ci

# dev server
npm run dev

# production build
npm run build

# preview production build locally
npm run preview

# run linter
npm run lint
```

---

