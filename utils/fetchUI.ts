export async function fetchUI(endpoint: string) {
    const res = await fetch(`http://localhost:3001/ui/${endpoint}`);
    return res.json();
  }
