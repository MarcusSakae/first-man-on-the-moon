import { API_URL } from "@env";

/**
 * API fetch helper
 * Returns
 */
export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  timeout = 5000
): Promise<any> {
  console.log("API_URL", API_URL + endpoint);
  return Promise.race([
    fetch(API_URL + endpoint, options),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`timeout ${API_URL + endpoint}`)),
        timeout
      )
    ),
  ]);
}
