/**
 * Centralized API service layer for the Agentic Placement RAG frontend.
 *
 * All backend communication flows through this module.
 * No component should call the backend directly.
 *
 * Required environment variable:
 *   VITE_API_URL — The base URL of the deployed backend
 *                  (e.g. https://agentic-placement-rag-backend.onrender.com)
 */

// ─── Base URL Resolution ────────────────────────────────────────────────────
function getBaseUrl() {
  let base = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");
  if (base && !/^https?:\/\//i.test(base)) {
    base = `https://${base}`;
  }
  return base;
}

const BASE_URL = getBaseUrl();

// ─── Internal Helpers ───────────────────────────────────────────────────────

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  let response;

  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
  } catch (networkErr) {
    console.error(`[api] Network error calling ${path}:`, networkErr);
    throw new Error("Unable to reach backend — please check your connection and try again.");
  }

  if (!response.ok) {
    let detail = `Server returned an error (HTTP ${response.status})`;
    try {
      const body = await response.json();
      detail = body?.detail || detail;
    } catch (_) {
      // Keep generic detail to avoid leaking internals.
    }
    throw new Error(detail);
  }

  return response;
}

async function jsonRequest(path, options = {}) {
  const res = await request(path, options);
  return res.json();
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** GET /health — checks backend availability. */
export async function checkHealth() {
  try {
    const data = await jsonRequest("/health");
    return { healthy: true, data };
  } catch (err) {
    return { healthy: false, error: err.message };
  }
}

/** POST /api/chat — sends a user query to the RAG pipeline. */
export async function sendChat(query, sessionId, requestId) {
  return jsonRequest("/api/chat", {
    method: "POST",
    body: JSON.stringify({ query, session_id: sessionId, request_id: requestId }),
  });
}

/** GET /api/pipeline-status/{id} — returns an EventSource URL for SSE streaming. */
export function getPipelineStatusUrl(requestId) {
  return `${BASE_URL}/api/pipeline-status/${requestId}`;
}

/** GET /api/dashboard/{id} — retrieves dashboard data for a specific request. */
export async function fetchDashboard(requestId) {
  return jsonRequest(`/api/dashboard/${requestId}`);
}

/** GET /api/vector-db/stats — retrieves vector database statistics. */
export async function fetchVectorDbStats() {
  return jsonRequest("/api/vector-db/stats");
}

/** GET /api/config — retrieves current feature toggle configuration. */
export async function fetchConfig() {
  return jsonRequest("/api/config");
}

/** POST /api/config — updates feature toggle configuration. */
export async function saveConfig(features) {
  return jsonRequest("/api/config", {
    method: "POST",
    body: JSON.stringify({ features }),
  });
}

/** POST /api/reindex — triggers a re-indexing of the knowledge base. */
export async function triggerReindex() {
  return jsonRequest("/api/reindex", { method: "POST" });
}

/** Returns the resolved base URL (for components that still need it directly). */
export function getApiBaseUrl() {
  return BASE_URL;
}
