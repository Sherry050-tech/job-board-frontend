import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompanyLogo } from "./CompanyLogos";
import { IconVerified, IconBookmark, IconArrowRight, IconMapPin } from "./Icons";
import { getSavedJobIds, toggleSavedJobId } from "../api";

export default function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedIds = getSavedJobIds();
    setIsSaved(savedIds.includes(job.id));
  }, [job.id]);

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleSavedJobId(job.id);
    setIsSaved(updated.includes(job.id));
    // Dispatch custom event so Navbar updates counter
    window.dispatchEvent(new Event("bookmarksUpdated"));
  };

  const workModeBadgeClass =
    job.workMode?.toLowerCase() === "remote"
      ? "badge badge-remote"
      : job.workMode?.toLowerCase() === "hybrid"
      ? "badge badge-hybrid"
      : "badge badge-onsite";

  return (
    <Link to={`/jobs/${job.id}`} className="job-row-card">
      {/* Left: Logo & Job Details */}
      <div className="job-row-left">
        <CompanyLogo name={job.company} slug={job.companySlug} size={46} />

        <div className="job-row-info">
          <div className="job-row-title-row">
            <h3 className="job-row-title">{job.title}</h3>
            {job.featured && (
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#1d4ed8",
                  background: "#eff6ff",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #bfdbfe"
                }}
              >
                Featured
              </span>
            )}
          </div>

          <div className="job-row-company-row">
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{job.company}</span>
            {job.verified && <IconVerified size={14} title="Verified hiring partner" />}
            <span style={{ color: "var(--border-medium)" }}>•</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)" }}>
              <IconMapPin size={13} />
              {job.location}
            </span>
          </div>

          {/* Tags */}
          <div className="job-row-center-tags" style={{ marginTop: "0.35rem" }}>
            <span className={workModeBadgeClass}>{job.workMode || "Remote"}</span>
            {job.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="badge badge-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div />

      {/* Right: Salary, Freshness & Actions */}
      <div className="job-row-right">
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span className="badge badge-salary">{job.salary}</span>
          <span className="job-row-date">{job.postedAt}</span>
        </div>

        <button
          onClick={handleToggleBookmark}
          className={`btn-icon-square ${isSaved ? "active" : ""}`}
          title={isSaved ? "Remove from saved" : "Save this role"}
          aria-label="Save role"
        >
          <IconBookmark size={16} filled={isSaved} />
        </button>

        <span className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem", fontWeight: 600 }}>
          View <IconArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}
