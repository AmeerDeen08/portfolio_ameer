# Ameerdeen N — Portfolio

Personal cybersecurity portfolio built with React, TypeScript, Tailwind CSS and Vite.
Design based on [Samrinjaji/Portfolio](https://github.com/Samrinjaji/Portfolio), re-themed for security.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Updating content

**All text, links and data live in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Edit it and the whole site updates. Covered there: personal info, hero, about, toolkit,
projects, experience, education, certifications, achievements, contact and footer.

| What | Where |
|---|---|
| Profile photo | `public/images/profile.jpg` |
| Organisation logos | `public/logos/` (set `bg: "dark"` for white logos, `wide: true` for wordmarks) |
| Certificate PDFs | `public/certificates/` |
| Project screenshots | put in `public/images/` and set `image: "/images/xyz.png"` on the project |
| Colours / theme | tokens at the top of `src/index.css` |

Leave any link as `""` to hide its button.

## Contact form

Copy `.env.example` to `.env` and add your EmailJS keys so messages go straight to your inbox.
Without keys, the form opens the visitor's email app pre-filled.

## Deploy

Push to GitHub and import the repo into [Vercel](https://vercel.com) (framework: Vite).
Add the `VITE_EMAILJS_*` variables in the Vercel project settings if you use EmailJS.
