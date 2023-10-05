import { API_URL } from "@env";

/**
 * API fetch helper
 * Returns
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {},
  timeout = 5000
): Promise<any> {
  return Promise.race([
    fetch(API_URL + url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}
