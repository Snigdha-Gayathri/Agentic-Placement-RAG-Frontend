<div align="center">

# 🤖 Agentic Placement RAG — Frontend

### A real-time, transparent UI for an Agentic RAG placement-prep assistant

*Streaming chat · Live pipeline visualization · Developer observability dashboard · Runtime feature toggles*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Render](https://img.shields.io/badge/Render-Static_Site-46E3B7?logo=render&logoColor=white)](https://agentic-placement-rag.onrender.com/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](#-license)

[🚀 Live App](https://agentic-placement-rag.onrender.com/) · [⚙️ Backend Repo](https://github.com/Snigdha-Gayathri/Agentic-Placement-RAG-Backend) · [📖 Backend README](../Agentic-Placement-RAG-Backend/README.md)

</div>

---

## 🎯 Overview

The **Agentic Placement RAG Frontend** is a `React + Vite` single-page app that gives users a fully transparent view into an Agentic RAG pipeline. Beyond a standard chat UI, it streams **live pipeline stage updates** over Server-Sent Events, surfaces a **developer observability dashboard** (latencies, retrieval scores, guardrail verdicts), and lets users toggle individual retrieval and security components on the fly — turning the RAG "black box" into something you can watch execute in real time.

---

## ✨ Features

<details open>
<summary><b>💬 Interactive AI Chat</b></summary>

- Streaming-ready chat interface for technical placement interview prep
- Covers DSA, System Design, Behavioral, and Company-Specific Q&A
- Session history managed via `ConversationSidebar.jsx`
</details>

<details open>
<summary><b>📊 Live Pipeline Progress</b></summary>

- Real-time visual feedback for each Agentic RAG stage: Query Rewriting → HyDE → Hybrid Retrieval → Cross-Encoder Reranking → Generation
- Powered by SSE via `PipelineProgress.jsx`
</details>

<details open>
<summary><b>🧑‍💻 Developer Observability Dashboard</b></summary>

- Deep-dive metrics: latencies, retrieved chunk scores, context window usage
- Safety guardrail verdicts surfaced per request via `DeveloperDashboard.jsx`
</details>

<details open>
<summary><b>🎛️ Dynamic Feature Toggles</b></summary>

- Enable/disable dense retrieval, BM25 sparse search, query rewriting, and agent planning at runtime
- Managed via `FeatureToggles.jsx`
</details>

---

## 🏗️ Architecture & Communication

```
                   User
                     │
                     ▼
        React + Vite Frontend
                     │
                     ▼
            FastAPI Backend
                     │
 ┌───────────────────┼───────────────────┐
 │                   │                   │
 ▼                   ▼                   ▼
Security         Agent Router      Dashboard
 │                   │                   │
 └──────────────┬────┴──────────────┬────┘
                ▼
        Hybrid Retriever
        Dense + BM25 + HyDE
                │
                ▼
       Cross-Encoder Reranker
                │
                ▼
          Gemini 2.5 Flash
                │
                ▼
          Streaming Response
```

The frontend talks to the [Agentic Placement RAG Backend](https://github.com/Snigdha-Gayathri/Agentic-Placement-RAG-Backend) (`FastAPI` + `ChromaDB` + `Gemini`). All API URLs are read from environment variables — **no hardcoded endpoints** in production builds.

- **Local dev:** proxies `/api` to `http://127.0.0.1:8000` via `vite.config.js`, or connects directly using `VITE_API_BASE_URL`
- **Production:** dynamically targets `VITE_API_BASE_URL` set at build time

---

## 🧩 Folder Structure

```
Agentic-Placement-RAG-Frontend/
├── public/                      # Static assets and icons
├── src/
│   ├── assets/                  # Images and styles
│   ├── App.jsx                  # Core application layout and chat orchestrator
│   ├── ConversationSidebar.jsx  # Session history manager
│   ├── DeveloperDashboard.jsx   # Observability & metrics inspector
│   ├── FeatureToggles.jsx       # Runtime guardrail and RAG toggles
│   ├── PipelineProgress.jsx     # Live SSE pipeline stage visualizer
│   ├── conversationManager.js   # Client-side session and storage utilities
│   ├── index.css                # Global CSS styles
│   └── main.jsx                 # React entrypoint
├── index.html                   # Main HTML template
├── package.json                 # Node dependencies and build scripts
├── vite.config.js               # Vite configuration and dev server proxy
└── render.yaml                  # Render static site deployment manifest
```

---

## 🛠️ Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?logo=css3&logoColor=white)

**AI/ML Integration**

![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?logo=googlegemini&logoColor=white)
![SSE](https://img.shields.io/badge/SSE-Live_Pipeline_Streaming-red)

**Deployment**

![Render](https://img.shields.io/badge/Render-Static_Site-46E3B7?logo=render&logoColor=white)

**Tooling**

![ESLint](https://img.shields.io/badge/ESLint-Linting-4B32C3?logo=eslint&logoColor=white)
![npm](https://img.shields.io/badge/npm-Package_Manager-CB3837?logo=npm&logoColor=white)

---

## 📊 Dashboard Preview

> Add screenshots or GIFs of your running app here — recommended shots:

| View | Description |
|------|--------------|
| 💬 **Chat UI** | Streaming conversation interface with session history |
| 📈 **Pipeline Timeline** | Live stage-by-stage RAG execution tracker |
| 🧑‍💻 **Metrics Dashboard** | Latency, token usage, and grounding scores |
| 🔍 **Retrieved Chunks** | Ranked chunks with dense/BM25/rerank scores |
| 🛡️ **Security Events** | Guardrail pass/fail verdicts per request |

```markdown
![Chat UI](./docs/screenshots/chat-ui.png)
![Pipeline Timeline](./docs/screenshots/pipeline-timeline.png)
![Metrics Dashboard](./docs/screenshots/metrics-dashboard.png)
![Retrieved Chunks](./docs/screenshots/retrieved-chunks.png)
![Security Events](./docs/screenshots/security-events.png)
```

---

## 🚀 Deployment

```
React (Render Static)
          │
          ▼
        HTTPS
          │
          ▼
FastAPI (Render Web Service)
          │
          ▼
      Gemini API
          │
          ▼
    Google Drive / data/
```

Pre-configured for Render via `render.yaml`:

1. Connect this repo to Render as a **Static Site**.
2. Render applies:
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`
3. Set `VITE_API_BASE_URL` to your deployed backend URL (e.g. `https://your-backend.onrender.com`).
4. Deploy — SPA routing and secure headers are handled automatically.

---

## 💻 Local Development

**Prerequisites:** Node.js `v18` or `v20+`, npm or pnpm

```bash
# 1. Install dependencies
npm ci

# 2. Configure environment
cp .env.example .env
# then set VITE_API_BASE_URL=http://127.0.0.1:8000 in .env

# 3. Run the dev server
npm run dev
```

Open `http://localhost:5173`

**Production build:**

```bash
npm run build      # optimized production bundle
npm run preview    # verify the build locally
```

---

## 🧪 Testing

| Suite | Covers |
|-------|--------|
| **API integration tests** | Contract checks against backend `/api` endpoints |
| **Component tests** | Chat, pipeline visualizer, dashboard rendering |
| **Lint** | `eslint.config.js` enforced code style |

---

## 🔗 Related

- ⚙️ [Backend README](https://github.com/Snigdha-Gayathri/Agentic-Placement-RAG-Backend) — Agentic RAG architecture, security, and API
- 🌐 [Live Demo](https://agentic-placement-rag.onrender.com/)

---

## 📄 License

MIT — see `LICENSE` for details.
