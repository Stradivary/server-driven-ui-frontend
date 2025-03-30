export async function fetchUI(endpoint: string) {
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
  const apiUrl = isLocal ? "http://localhost:3001" : process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) throw new Error("API URL is not defined");

  const res = await fetch(`${apiUrl}/ui/${endpoint}`);
  return res.json();
}