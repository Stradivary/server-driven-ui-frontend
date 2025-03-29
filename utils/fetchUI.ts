export async function fetchUI(endpoint: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const res = await fetch(`${apiUrl}/ui/${endpoint}`);
  return res.json();
}
