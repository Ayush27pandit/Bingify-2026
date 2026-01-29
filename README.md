# Bingify 🎥

> [!IMPORTANT]
> **Backend Repository:** [bingify-server](https://github.com/Ayush27pandit/bingify-server)

**Watch together, from anywhere.**  
Bingify is a real-time synchronized video watching platform that lets friends watch movies and shows together in perfect sync, no matter where they are.

![Bingify Dashboard](https://wnvechfqaaomuauwzcjz.supabase.co/storage/v1/object/public/assests/Screenshot%202026-01-29%20120954.png)

## 🚀 Features

-   **Real-time Synchronization**: Frame-perfect playback sync across all users in a room using WebSocket.
-   **Video & Voice Chat**: Integrated communication to make it feel like you're on the same couch.
-   **Interactive Lobby**: Create or join rooms with unique codes.
-   **High-Quality Streaming**: Powered by Mux for adaptive bitrate streaming.
-   **Secure Authentication**: Google and Email/Password login via Firebase Auth.
-   **Modern UI/UX**: Built with Next.js 16, Framer Motion, and Tailwind CSS v4 for a fluid, premium feel.

## 🛠 Tech Stack

### Frontend (Client)
-   **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **3D Elements**: [Spline](https://spline.design/)
-   **Real-time**: Socket.io Client
-   **Video Player**: Mux Player React
-   **Auth**: Firebase Client SDK

### Backend (Server)
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Real-time**: [Socket.io](https://socket.io/)
-   **Database**: PostgreSQL (via [Neon](https://neon.tech/))
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Auth**: Firebase Admin SDK
-   **Scheduled Tasks**: Node Cron (for room cleanup)

## 🏗 Architecture

Bingify uses a **BFF (Backend for Frontend)** pattern for authentication and session management to ensure secure HTTP-only cookies are used.

1.  **Auth Flow**: 
    -   Frontend authenticates with Firebase.
    -   Token is sent to Next.js API Route (`/api/auth/session`).
    -   API Route proxies request to Backend to verify token and create efficient session is backend.
    -   Secure Session Cookie is set on the Frontend domain.
2.  **Room Logic**:
    -   Users create room -> Backend generates unique Room ID & Password.
    -   Socket connection established for `join-room`, `play`, `pause`, `seek` events.
    -   `playbackSync` job ensures all clients stay within a tight time window.

## 📦 Installation & Setup

### Prerequisites
-   Node.js v18+
-   PostgreSQL Database
-   Firebase Project

### 1. Clone the Repositories
The project is split into two workspaces:
-   `lp` (Landing Page/Frontend)
-   `bingi-server` (Backend)

### 2. Backend Setup
Navigate to `bingi-server`:
```bash
cd bingi-server
npm install
```

Create a `.env` file:
```env
PORT=8000
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-client-email"
FIREBASE_PRIVATE_KEY="your-private-key"
FRONTEND_URL="http://localhost:3000"
```

Run migrations and start server:
```bash
npx prisma migrate dev
npm run dev
```

### 3. Frontend Setup
Navigate to `lp`:
```bash
cd lp
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
# ... other firebase config
```

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to start watching!

## 🤝 Contribution
Feel free to open issues or submit PRs.

## 📄 License
MIT
