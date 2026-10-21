import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { IconCheck } from "../components/Icons";

export default function RegisterPage({ setUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.register(name, email, password, role);
      if (res.success && res.data) {
        setUser(res.data);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 460, margin: "4rem auto", padding: "0 1.5rem" }}>
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-xl)", padding: "2.25rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            GET STARTED // DIRECT ACCESS
          </span>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 700, color: "#ffffff", marginTop: "0.35rem" }}>
            Create an Account
          </h1>
          <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Track applications, save roles, or hire verified technical talent
          </p>
        </div>

        {error && (
          <div style={{ background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.2)", color: "#fb7185", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-sm)", fontSize: "0.825rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Role segmented toggle */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <button
              type="button"
              className={role === "jobseeker" ? "btn-primary" : "btn-secondary"}
              onClick={() => setRole("jobseeker")}
              style={{ fontSize: "0.825rem", padding: "0.5rem" }}
            >
              I am a Candidate
            </button>
            <button
              type="button"
              className={role === "employer" ? "btn-primary" : "btn-secondary"}
              onClick={() => setRole("employer")}
              style={{ fontSize: "0.825rem", padding: "0.5rem" }}
            >
              I am an Employer
            </button>
          </div>

          <div className="form-group-field">
            <label className="form-field-label">Full Name</label>
            <input
              type="text"
              className="minimal-input"
              placeholder="e.g. Alex Rivera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group-field">
            <label className="form-field-label">Email Address</label>
            <input
              type="email"
              className="minimal-input"
              placeholder="alex@example.com"
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
              placeholder="At least 8 characters"
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
            {loading ? "Creating..." : "Complete Registration"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--text-primary)", fontWeight: 600, textDecoration: "none" }}>
            Sign in →
          </Link>
        </div>
      </div>
    </div>
  );
}
