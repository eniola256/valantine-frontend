const API_BASE = "http://localhost:5000";

export async function createValentine(data) {
  const res = await fetch(`${API_BASE}/valentines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create Valentine");
  }

  return res.json();
}
