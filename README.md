# Bingify

**Watch movies and shows together, even when you're apart.**

Bingify is a modern, synchronized video watching platform designed to bring people together. Built with a focus on shared experiences, premium aesthetics, and technical simplicity.

![Bingify Hero](/public/og-image.jpg) <!-- Placeholder for potential screenshot -->

## ✨ Features

- **Synchronized Viewing**: Frame-perfect sync so everyone watches the same moment together.
- **Premium Lobby**: Interactive media selection with real-time search and genre filtering.
- **Private Rooms**: Invite-only spaces for friends, couples, and family.
- **Video Chat**: Low-latency communication built directly into the viewing experience.
- **Beautiful UI**: Dark-themed, glassmorphism-inspired design with fluid animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Custom SVG System + [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/bingify.git
cd bingify
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/app`: App Router pages (`/`, `/lobby`, `/start`)
- `/components`:
  - `/landing`: Marketing site components (Hero, Features, Pricing)
  - `/lobby`: App components (MediaGrid, Search, Filters)
  - `/icons`: Custom SVG icon system
- `/public`: Static assets

## 🎨 Design System

Bingify follows a strict "Premium Dark" aesthetic:
- **Background**: Zinc-950 (`#09090B`)
- **Accents**: Blue-500 / Indigo-500 gradients
- **Typography**: Inter (Clean, modern sans-serif)
- **Motion**: `framer-motion` with exponential easing for smooth interactions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
