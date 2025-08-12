# Prompt for Claude 4 — “One‑Page 3D Portfolio with Next.js”

**Your Role:** You are a senior Frontend and Developer Experience architect tasked with building a **single‑page portfolio** with a **3D environment**. The output must be **complete, production‑ready code** (Next.js 14+ App Router + TypeScript) with high quality, optimization, and brief documentation.

---

## Main Goals
- Create a **Single Page Portfolio** with sections: Header, Hero (3D Canvas), Projects, About, Contact/Footer.
- **Interactive 3D scene** using `react-three-fiber` + `@react-three/drei` (WebGL2).
- Minimal, modern design, dark theme, readable typography, subtle animations (Framer Motion).
- **SEO + accessibility** optimized, with Lighthouse scores: Performance≥90, Accessibility≥95, Best Practices≥95, SEO≥95 on desktop.
- Lightweight initial bundle (≤ 2–3MB before caching), fast loading.

---

## Technologies & Packages
- **Next.js 14+ (App Router) + TypeScript**
- **Tailwind CSS** + **shadcn/ui** for base components
- **react-three-fiber** + **@react-three/drei** for 3D
- **framer-motion** for UI animations
- **next-seo** for metadata & OpenGraph
- **eslint + prettier** configured
- (Optional) **next-sitemap** for sitemap & robots.txt

---

## Required Features
1. **Hero 3D:**
   - Full‑height `Canvas` (≥60vh) with simple PBR lighting and dark background.
   - Lightweight composition (e.g., torusKnot + glass sphere + wireframe ring) or **GLB loader** (placeholder) with `useGLTF`.
   - User interaction: OrbitControls with limited movement (no pan, optional zoom), hover/click on objects.
   - Optimization: `dpr={[1,2]}`, use `Suspense` + `React.lazy`, **KTX2**/Basis and Draco support (sample code & hook ready).

2. **Header:** Sticky with name, social links, and “Contact/Email” CTA.

3. **Projects:** Project cards with image or gradient placeholder, title, short description, technology tags, and demo/GitHub link.

4. **About:** Short bio, skills (icons or badges), tools.

5. **Contact/Footer:** Email/form (UI only), copyright.

6. **SEO/Meta:** OG/Twitter tags, favicon, `next-seo` configured, schema (Person + Website) minimal.

7. **Accessibility:** Proper roles & aria‑labels, high contrast, clear focus states, keyboard navigation.

8. **Responsive:** Mobile‑friendly, project grid adapts for sm/md/lg breakpoints.

9. **Performance:** Code splitting, lazy‑loading 3D, prefetch important links, optimized images, `dynamic()` for 3D section.

10. **Developer Experience:** npm scripts for dev/build/lint/format, short README.

---

## Expected Output Structure
- **Files with separate code blocks**, each named with full path:
  - `package.json`
  - `next.config.mjs`
  - `tsconfig.json`
  - `postcss.config.mjs`, `tailwind.config.ts`
  - `app/layout.tsx`, `app/globals.css`
  - `app/page.tsx` (main single‑page)
  - `components/Header.tsx`, `components/Hero3D.tsx`, `components/Projects.tsx`, `components/About.tsx`, `components/Footer.tsx`
  - `components/Three/Scene.tsx`, `components/Three/Loader.tsx`, `components/Three/hooks/useCompressedAssets.ts`
  - `lib/seo.ts`
  - `public/models/placeholder.glb` (if binary not provided, explain where to place)
  - `public/icons/*` (as reference)
  - `.eslintrc.cjs`, `.prettierrc`
  - `README.md`
- **All code must be real and complete** (no pseudo‑code or ellipsis).

---

## Key Technical Requirements
- `Hero3D` must load via `dynamic(() => import(...), { ssr: false })` to keep SSR light.
- Scene setup:
  - Lighting: `ambientLight` + `directionalLight`.
  - `Environment` from drei (preset: city).
  - `ContactShadows` for depth.
  - Small animation with `Float` or similar.
  - `PresentationControls` or limited OrbitControls.
- Compression prep:
  - Hook for loading KTX2 textures / Draco meshes if available (sample API & README note).
- Tailwind dark theme, large border radius, soft shadows, proper spacing.
- Projects: data from static array in component or `/lib/projects.ts`.
- All links/texts from a **central CONFIG** (name, title, description, socials, projects).
- **Framer Motion animations**: smooth section entry, hover on cards, micro‑interactions on CTA.
- **next-seo**: title/description, OG image placeholder, canonical.

---

## Install & Run (README)
- `npm i`
- `npm run dev`
- `npm run build && npm start`
- Notes for Vercel/Netlify deploy.
- How to replace `placeholder.glb` and when to use compression tool.

---

## Acceptance Criteria
- Project builds with `npm run build` without errors.
- Smooth 3D hero (60fps on standard desktop), basic interactions work.
- Lighthouse desktop scores meet targets (or close).
- ESLint/Prettier pass without major errors.
- Modular, readable code.

---

## Response Format
- Provide files & code in logical order.
- End with a short “Quick Personalization Guide” (edit CONFIG, add GLB, change theme colors).

---

## Additional Notes
If special requirements apply (e.g., custom font, RTL layout, specific color palette), apply them directly in code and styles.
Now, please generate the **complete project**.
