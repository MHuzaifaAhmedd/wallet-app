import { API_URL } from "../constants/api";

async function readResponseBody(response) {
  const contentType = response.headers?.get?.("content-type") || "";
  const text = await response.text();

  if (contentType.toLowerCase().includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      // Fall through to return text so callers get something meaningful.
    }
  }

  return text;
}

export async function fetchApiJson(path, options) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_URL}${normalizedPath}`;

  const response = await fetch(url, options);
  const body = await readResponseBody(response);

  if (!response.ok) {
    const message =
      typeof body === "string"
        ? body
        : body?.message || body?.error || `Request failed (${response.status})`;

    const error = new Error(message);
    error.status = response.status;
    error.url = url;
    error.body = body;
    throw error;
  }

  if (typeof body === "string") {
    throw new Error(`Expected JSON but received text from ${url}`);
  }

  return body;
}

