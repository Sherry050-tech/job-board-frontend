import { useState } from "react";
import { Link } from "react-router-dom";
import { salaryBands, jobs } from "../mockData";
import { IconArrowRight, IconChart, IconDollar } from "../components/Icons";

export default function SalariesPage() {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const activeBand = salaryBands[selectedRoleIndex];
  const matchingJobs = jobs.filter((j) => j.category === activeBand.category);

  const formatCurrency = (val) => {
    return `$${(val / 1000).toFixed(0)}k`;
  };

  return (
    <div className="feed-content-wrap" style={{ marginTop: "3.5rem" }}>
      {/* Header */}
      <div style={{ maxWidth: 820, marginBottom: "2.5rem" }}>
        <div className="hero-kicker">
          <span style={{ color: "var(--accent-emerald)" }}>●</span>
          <span>Market Intelligence // Verified Compensation</span>
        </div>
        <h1 className="hero-main-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Transparent compensation benchmarks for modern tech.
        </h1>
        <p className="hero-main-subtitle">
          Real base compensation bands and equity grant ranges aggregated across tier-1 software companies,
          Series B+ scale-ups, and frontier AI research labs.
        </p>

        {/* Role Segmented Tabs */}
        <div className="filter-pills-group" style={{ marginTop: "1.5rem" }}>
          {salaryBands.map((band, idx) => (
            <button
              key={band.role}
              className={`filter-tab-pill ${selectedRoleIndex === idx ? "active" : ""}`}
              onClick={() => setSelectedRoleIndex(idx)}
            >
              {band.role}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="salaries-table-card">
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
              {activeBand.role} — 2026 Compensation Breakdown
            </h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Data normalized for United States & Global Remote tier-1 hubs
            </span>
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--accent-emerald)",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              padding: "0.2rem 0.55rem",
              borderRadius: 4
            }}
          >
            Verified Cohort
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="salary-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Experience</th>
                <th>25th Percentile</th>
                <th>Median Base</th>
                <th>75th Percentile</th>
                <th>Top 10% (90th)</th>
                <th>Annual Equity</th>
              </tr>
            </thead>
            <tbody>
              {activeBand.levels.map((lvl) => {
                const maxVal = 650000;
                const fillPercent = Math.min(100, Math.round((lvl.median / maxVal) * 100));

                return (
                  <tr key={lvl.level}>
                    <td style={{ fontWeight: 600, color: "#ffffff" }}>{lvl.level}</td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {lvl.experience}
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(lvl.p25)}</td>
                    <td>
                      <span className="salary-val-highlight">{formatCurrency(lvl.median)}</span>
                      <div className="percentile-track">
                        <div className="percentile-fill" style={{ width: `${fillPercent}%` }} />
                      </div>
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(lvl.p75)}</td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                      {formatCurrency(lvl.p90)}
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--accent-sky)", fontSize: "0.825rem" }}>
                      {lvl.equity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Direct Matching Jobs ── */}
      <div style={{ marginTop: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
            Active Openings in {activeBand.category} ({matchingJobs.length})
          </h3>
          <Link to="/" style={{ color: "var(--accent-sky)", fontSize: "0.825rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            View all board roles <IconArrowRight size={13} />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
          {matchingJobs.slice(0, 3).map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{job.company}</span>
                  <span className="badge badge-salary">{job.salary}</span>
                </div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#ffffff", marginTop: "0.35rem" }}>
                  {job.title}
                </h4>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.775rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem" }}>
                <span>{job.location}</span>
                <span style={{ color: "var(--accent-sky)" }}>View Spec →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
