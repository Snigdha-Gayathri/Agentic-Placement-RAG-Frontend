# Agentic Placement RAG — Frontend Application

A modern, responsive, and real-time **React / Vite** frontend interface for the **Agentic Placement RAG Assistant**. This application features interactive chat, real-time pipeline visualization (via Server-Sent Events), comprehensive developer dashboard observability, and dynamic feature toggles.

## Features

- **Interactive AI Chat**: High-performance, streaming-ready chat interface designed for technical placement interviews (DSA, System Design, Behavioral, and Company-Specific Q&A).
- **Live Pipeline Progress**: Visual feedback tracking the multi-stage Agentic RAG execution (Query Rewriting, Hybrid Retrieval, Cross-Encoder Reranking, HyDE, and Generation).
- **Developer Observability Dashboard**: Deep-dive metrics monitoring latencies, retrieved chunk scores, context window usage, and safety guardrail verdicts.
- **Dynamic Feature Toggles**: Enable or disable dense retrieval, BM25 sparse search, query rewriting, and agent planning on the fly.

---

## Architecture & Communication

The frontend communicates with the **Agentic Placement RAG Backend** (`FastAPI` + `ChromaDB` + `Gemini`).
All API base URLs are read dynamically from environment variables, ensuring zero hardcoded endpoints in production builds.

- **Local Development**: Proxies `/api` requests to `http://127.0.0.1:8000` via `vite.config.js` or directly connects using `VITE_API_BASE_URL`.
- **Production Deployment**: Dynamically targets the configured `VITE_API_BASE_URL` set during build time.

---

## Quick Start (Local Development)

### Prerequisites
- Node.js (`v18` or `v20+`)
- npm or pnpm

### 1. Installation
```bash
npm ci
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and set your backend URL:
```bash
cp .env.example .env
```
In `.env`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Production Build & Verification

To create an optimized production bundle:
```bash
npm run build
```
Verify the production build locally:
```bash
npm run preview
```

---

## Render Deployment

This repository is pre-configured for instant static deployment on **Render** via `render.yaml`.

### Steps:
1. Connect this GitHub repository (`Agentic-Placement-RAG-Frontend`) to your Render account as a **Static Site**.
2. Render will automatically apply settings from `render.yaml`:
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
3. Under the Render **Environment Variables** dashboard for this service, ensure `VITE_API_BASE_URL` is set to the URL of your deployed backend (e.g., `https://your-backend.onrender.com`).
4. Trigger deploy. Your SPA routes and secure headers are automatically handled.

---

## Repository Structure

```
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Images and styles
│   ├── App.jsx             # Core application layout and chat orchestrator
│   ├── ConversationSidebar.jsx # Session history manager
│   ├── DeveloperDashboard.jsx  # Observability & metrics inspector
│   ├── FeatureToggles.jsx      # Runtime guardrail and RAG toggles
│   ├── PipelineProgress.jsx    # Live SSE pipeline stage visualizer
│   ├── conversationManager.js  # Client-side session and storage utilities
│   ├── index.css           # Global CSS styles
│   └── main.jsx            # React entrypoint
├── index.html              # Main HTML template
├── package.json            # Node dependencies and build scripts
├── vite.config.js          # Vite configuration and dev server proxy
└── render.yaml             # Render static site deployment manifest
```
