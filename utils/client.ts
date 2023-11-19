import { API_URL } from "@env";

export async function apiFetch(endpoint: string, options: RequestInit = {}, timeout = 5000): Promise<any> {
  let method = options.method || "GET";
  options.headers = options.headers || { "Content-Type": "application/json" };

  console.log(`[${method}] ${API_URL}${endpoint}`);
  if (method == "POST") console.log("[BODY]", options.body);

  let responsePromise: Promise<Response> = fetch(API_URL + endpoint, options);

  try {
    Promise.race([
      responsePromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(`timeout ${API_URL + endpoint}`)), timeout)),
    ]);
  } catch (err) {
    console.log("[FETCH ERROR]", err);
  }

  let response = await responsePromise;

  let text = await response.text();
  try {
    let json = JSON.parse(text);
    return json;
  } catch (err) {
    console.log("[PARSE ERROR]", err);
    console.log("[TRIED PARSE]", text);
  }
}
