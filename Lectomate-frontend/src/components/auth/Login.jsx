import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      setSuccess("Logged in successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue to Lectomate</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {error && <div className="msg-error">{error}</div>}
        {success && <div className="msg-success">{success}</div>}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account? 
        <Link to="/signup" className="auth-link">Signup</Link>
      </div>
    </div>
  );
}
