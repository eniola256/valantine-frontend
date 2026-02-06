import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ResultPage.css";

const API_BASE = "http://localhost:5000";

export default function ResultPage() {
  const { code } = useParams();
  const [linkCopied, setLinkCopied] = useState(false);
  const [valentine, setValentine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch status from backend
  async function fetchResult() {
    try {
      const res = await fetch(`${API_BASE}/valentines/${code}/result`);
      if (!res.ok) throw new Error("Could not fetch Valentine result");
      const data = await res.json();
      setValentine(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResult();

    // Optional: poll every 5 seconds
    const interval = setInterval(fetchResult, 5000);
    return () => clearInterval(interval);
  }, [code]);

  // Copy link to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/v/${code}`);
    setLinkCopied(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
    <div className="result">
        <div className="result-page">
        <h1>Valentine Link</h1>

        <div className="link-container">
            <p>
                Share this link with your Valentine, and <strong>bookmark this page</strong> so you can check the response later:
            </p>
            <code>{`${window.location.origin}/v/${code}`}</code> <br />
            <button 
                onClick={handleCopy} 
                disabled={linkCopied} // disables after clicking
            >
                {linkCopied ? "Copied ✅" : "Copy"}
            </button>
        </div>

        {linkCopied && (
            <div className="waiting">
            {valentine.response ? (
                <p>
                Response: <strong>{valentine.response.toUpperCase()}</strong>
                </p>
            ) : (
                <p>Waiting for response...</p>
            )}
            </div>
        )}
        </div>
    </div>
    </>
  );
}
