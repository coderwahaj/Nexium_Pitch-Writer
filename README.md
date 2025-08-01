# 🚀 PitchPro – AI-Powered Pitch Generator

PitchPro is an AI-powered web application designed to help users effortlessly generate professional, creative, and persuasive pitches. Whether you're a startup founder, student, freelancer, or marketer, PitchPro simplifies the process of writing impactful pitches in seconds.

## ✨ Features

- 🧠 Generate AI-powered startup pitches instantly  
- 🌐 Translate pitches to multiple languages *(Coming Soon)*  
- 🎨 Sleek, responsive UI with a futuristic design  
- 🔒 Authentication with session-based access  
- 📂 Save and view your pitch history  

## 🧰 Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS  
- **Backend:** Node.js (via Next API Routes)  
- **AI Integration:** OpenAI / GPT API *(via n8n logic or server route)*  
- **Authentication:** Supabase Auth / NextAuth  
- **Styling:** TailwindCSS with custom themes & animations  
- **Deployment:** Vercel (CI/CD enabled)  

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/coderwahaj/pitchpro.git
cd pitchpro
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Now visit `http://localhost:3000` in your browser.

## 📁 Folder Structure

```
/app             → Next.js app directory  
/components      → Reusable UI components  
/providers       → Authentication/context providers  
/styles          → Tailwind & global styles  
/public          → Static assets like icons and images  
```

## 🌐 Live Demo

[https://pitchpro.vercel.app](https://pitchpro.vercel.app) *(Coming Soon)*

## 📌 To-Do / Future Features

* [ ] Add pitch translation support
* [ ] Allow users to export pitches (PDF/Markdown)
* [ ] Improve mobile responsiveness
* [ ] Add feedback form for AI results
* [ ] Dashboard for saved pitch history

## 👨‍💻 Authors

* **Wahaj Asif** – [@coderwahaj](https://github.com/coderwahaj)

## 📄 License

This project is licensed under the **MIT License**.

## 🙌 Support

Give this repo a ⭐ if you found it helpful!
For issues or suggestions, open a [GitHub Issue](https://github.com/coderwahaj/pitchpro/issues).

