import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { IconCheck, IconUser, IconBriefcase } from "../components/Icons";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (loginEmail, loginPassword) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.login(loginEmail || email, loginPassword || password);
      if (res.success && res.data) {
        setUser(res.data);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid authentication credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    if (role === "employer") {
      setEmail("recruiting@vercel.com");
      setPassword("password123");
      handleLogin("recruiting@vercel.com", "password123");
    } else {
      setEmail("alex.rivera@example.com");
      setPassword("password123");
      handleLogin("alex.rivera@example.com", "password123");
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: "4.5rem auto", padding: "0 1.5rem" }}>
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-xl)", padding: "2.25rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            INDEX // AUTHENTICATION
          </span>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 700, color: "#ffffff", marginTop: "0.35rem" }}>
            Sign in to Workspace
          </h1>
          <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Access application tracker, saved bookmarks, or employer studio
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>
            Instant Demo Sign-in
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => handleQuickDemo("seeker")}
              className="btn-secondary"
              style={{ fontSize: "0.775rem", padding: "0.45rem 0.6rem" }}
            >
              <IconUser size={13} /> As Candidate
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("employer")}
              className="btn-secondary"
              style={{ fontSize: "0.775rem", padding: "0.45rem 0.6rem" }}
            >
              <IconBriefcase size={13} /> As Employer
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.2)", color: "#fb7185", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-sm)", fontSize: "0.825rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="form-group-field">
            <label className="form-field-label">Email Address</label>
            <input
              type="email"
              className="minimal-input"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group-field">
            <label className="form-field-label">Password</label>
            <input
              type="password"
              className="minimal-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: "0.75rem", padding: "0.6rem" }}
          >
            {loading ? "Verifying..." : "Sign in to Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--text-primary)", fontWeight: 600, textDecoration: "none" }}>
            Create one →
          </Link>
        </div>
      </div>
    </div>
  );
}
