const API_BASE = "https://valentine-backend-enzy.onrender.com";

export async function createValentine(data) {
  const res = await fetch(`${API_BASE}/valentines/${code}/result`, {
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

// Add this function for fetching results
export async function getValentineResult(code) {
  const res = await fetch(`${API_BASE}/result/${code}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch result");
  }

  return res.json();
}

// You might also need this one
export async function getAllValentines() {
  const res = await fetch(`${API_BASE}/valentines`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch valentines");
  }

  return res.json();
}