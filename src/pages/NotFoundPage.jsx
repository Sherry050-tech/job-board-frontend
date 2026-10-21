import { Link } from "react-router-dom";
import { IconArrowLeft } from "../components/Icons";

export default function NotFoundPage() {
  return (
    <div style={{ maxWidth: 480, margin: "6rem auto", textAlign: "center", padding: "0 1.5rem" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "3rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "-0.05em" }}>
        404
      </div>
      <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#ffffff", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
        Resource not found
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
        The path you requested does not exist or has been relocated within the directory index.
      </p>
      <Link to="/" className="btn-secondary" style={{ display: "inline-flex", gap: "0.4rem" }}>
        <IconArrowLeft size={14} /> Return to jobs feed
      </Link>
    </div>
  );
}
