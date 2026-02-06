import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewValentine.css";

const API_BASE = "http://localhost:5000";

export default function ViewValentine() {
  const { code } = useParams();
  const [valentine, setValentine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseSent, setResponseSent] = useState(false);

  // Fetch Valentine info
  useEffect(() => {
    async function fetchValentine() {
      try {
        const res = await fetch(`${API_BASE}/valentines/${code}`);
        if (!res.ok) throw new Error("Valentine not found or expired");
        const data = await res.json();
        setValentine(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchValentine();
  }, [code]);

  // Send response (Yes / No)
  async function sendResponse(answer) {
    try {
      const res = await fetch(`${API_BASE}/valentines/${code}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: answer })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to submit response");
      }

      setResponseSent(true);
      setValentine(prev => ({ ...prev, response: answer }));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
    <div className="receive">
    <div className="receiver">
      <h1>{valentine.receiverName},</h1>
      <p>{valentine.message}</p>
      {!valentine.anonymous && valentine.senderName && (
        <p>— {valentine.senderName}</p>
      )}

      {!responseSent && !valentine.response ? (
        <div className="response-buttons">
          <button onClick={() => sendResponse("yes")}>Yes ❤️</button>
          <button onClick={() => sendResponse("no")}>No 💔</button>
        </div>
      ) : (
        <p className="response-text">
            {valentine.response === "yes" && "Yay, you said yes, I'm joyed 💖"}
            {valentine.response === "no" && "Sigh, you said no💔, I'm sad"}
        </p>

      )}
    </div>
    </div>
    </>
  );
}
