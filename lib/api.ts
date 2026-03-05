// lib/api.ts

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export async function api(path: string, options: ApiOptions = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
      {
        method: options.method || "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}
