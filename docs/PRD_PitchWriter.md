
# 📄 Pitch Writer – Product Requirements Document (PRD)

**Project Name:** Pitch Writer  
**Author:** Wahaj Asif  
**Version:** 1.0   
**Repository Path:** `/grand-project/docs/PRD.md`  

---

## 1. 🎯 Problem Statement

Crafting a compelling pitch — whether for a startup, product, idea, or job — is a challenge for non-writers and professionals alike. Most people struggle to structure their thoughts into persuasive content, especially under time pressure or in multiple languages. There is a lack of smart, automated, and easy-to-use tools to generate pitch content dynamically based on the user’s goals and context.

---

## 2. 💡 Solution Overview

**Pitch Writer** is a web-based AI-powered tool that helps users instantly generate high-quality pitch content by simply filling out a guided form. The tool supports:
- Multiple pitch types
- Language translation (English ↔ Urdu)
- Summarization for short versions
- Easy export as PDF

It integrates with AI models (via n8n + OpenRouter) and uses Supabase for authentication and pitch storage, with a futuristic UI built using Next.js and ShadCN.

---

## 3. 🧑‍💼 Target Audience

- **Startup founders** needing investor or elevator pitches
- **Job seekers** writing cover letter blurbs or personal intros
- **Students** preparing competition or project pitch material
- **Freelancers** creating client proposals or self-intros
- **Urdu-speaking users** who need translated versions

---

## 4. 🌟 Key Features

### 🔐 1. Login / Sign Up (Magic Link Auth)
- Users can log in via email-only authentication using Supabase Magic Links.
- No password required.
- Auth state is maintained using Supabase client in the frontend.

### 🏠 2. Dashboard (Pitch Type Selection)
- After login, users land on a dashboard.
- Tabs or cards display different types of pitch writers:
  - Startup Pitch
  - Job Intro Pitch
  - Project Pitch
  - Custom Pitch

### ✍️ 3. Pitch Writing Generation (AI)
- Users fill out a simple form depending on pitch type (e.g., problem, solution, target audience).
- Input is sent to a custom AI workflow in **n8n**, which uses **OpenRouter** to call a free AI model (like `Mixtral`).
- Generated pitch is displayed in real time.

### 🌐 4. Urdu Translation
- A “Translate to Urdu” button appears after pitch generation.
- Clicking it triggers another AI workflow via n8n to translate the pitch.
- Result is shown below the original.

### 🧾 5. Summarize
- A “Summarize Pitch” button shortens the pitch (useful for social media bios, email intros).
- Handled via prompt chaining in n8n (same AI model).

### 📄 6. Save as PDF
- Users can download their final pitch (English or Urdu) using `html2pdf.js`.
- PDF includes the pitch title, date, and branding footer.

---

## 5. 🛠️ Technical Stack

| Component      | Technology         |
|----------------|--------------------|
| Frontend       | Next.js + ShadCN   |
| Styling        | TailwindCSS        |
| Auth & DB      | Supabase           |
| AI Logic       | n8n (hosted on Render) + OpenRouter API |
| PDF Export     | html2pdf.js        |
| Deployment     | Vercel (CI/CD)     |

---

## 6. 📦 File Structure

```
/grand-project
├── /docs            → PRD, wireframes
├── /app             → Next.js frontend
├── /api             → Supabase config/schema
├── /ai              → n8n workflows
├── /public-demo     → Vercel live URL
└── README.md        → Final documentation + Loom
```
