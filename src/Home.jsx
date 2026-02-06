import "./Home.css";
import { useState } from "react";
import { createValentine } from "./api/valentine.js";
import { useNavigate } from "react-router-dom";


function Home() {
const navigate = useNavigate(); // <-- Must be inside the component
  const [formData, setFormData] = useState({
    senderName: "",
    receiverName: "",
    message: "",
    anonymous: false
  });

  const [linkCode, setLinkCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

  try {
     const result = await createValentine(formData);
     // Redirect to ResultPage
     navigate(`/valentines/${code}/result`);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    }

  return (
    <div className="Home">
      <div className="card">
        <div className="icon">❤️</div>

        <h1 className="title">Be My Valentine? 💌</h1>
        <p className="subtitle">Create a Valentine message to share</p>

        <form className="form" onSubmit={handleSubmit}>
          {!formData.anonymous && (
            <label>
              Your Name <span className="optional">(optional)</span>
              <input
                type="text"
                name="senderName"
                placeholder="Enter your name"
                value={formData.senderName}
                onChange={handleChange}
              />
            </label>
          )}

          <label>
            Their Name <span className="required">*</span>
            <input
              type="text"
              name="receiverName"
              placeholder="Enter their name"
              value={formData.receiverName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Your Message <span className="required">*</span>
            <textarea
              name="message"
              placeholder="Will you be my Valentine?"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <div className="toggle">
            <span>Send Anonymously</span>

            <label className="switch">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "🔗 Create Valentine Link"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {linkCode && (
          <div className="result">
            <p>Share this link:</p>
            <code>{window.location.origin}/v/{linkCode}</code>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
