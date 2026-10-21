import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompanyLogo } from "../components/CompanyLogos";
import {
  IconVerified,
  IconArrowRight,
  IconExternalLink,
  IconClose,
  IconCheck,
  IconBuilding,
  IconMapPin,
  IconBriefcase
} from "../components/Icons";
import { api } from "../api";

const CATEGORIES = [
  "All",
  "Developer Tools",
  "AI & Research",
  "Fintech",
  "Cloud & Infra",
  "Design & Creative",
  "Productivity"
];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCompanyDrawer, setActiveCompanyDrawer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const [compRes, jobsRes] = await Promise.all([
          api.getCompanies(),
          api.getJobs()
        ]);
        if (active) {
          if (compRes.success) setCompanies(compRes.data);
          if (jobsRes.success) setJobs(jobsRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const filteredCompanies =
    selectedCategory === "All"
      ? companies
      : companies.filter((c) => c.category === selectedCategory);

  const getCompanyJobs = (companyName) => {
    return jobs.filter(
      (j) => j.company?.toLowerCase() === companyName?.toLowerCase()
    );
  };

  return (
    <div className="feed-content-wrap" style={{ marginTop: "3.5rem" }}>
      {/* ── Editorial Header ── */}
      <div style={{ maxWidth: 820, marginBottom: "2.5rem" }}>
        <div className="hero-kicker">
          <span style={{ color: "var(--accent-sky)" }}>●</span>
          <span>Verified Organizations Directory</span>
        </div>
        <h1 className="hero-main-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Engineering teams built on craft, autonomy, and speed.
        </h1>
        <p className="hero-main-subtitle">
          We curate technology companies known for high engineering standards, competitive compensation,
          and healthy product cultures. No generic body shops or low-signal agencies.
        </p>

        {/* Category Pills */}
        <div className="filter-pills-group" style={{ marginTop: "1.5rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Companies Grid (Screen 3) ── */}
      {loading ? (
        <div style={{ padding: "4rem 0", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              width: 28,
              height: 28,
              border: "2px solid rgba(255,255,255,0.1)",
              borderTopColor: "#ffffff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite"
            }}
          />
        </div>
      ) : (
        <div className="companies-grid">
          {filteredCompanies.map((comp) => {
            const companyJobs = getCompanyJobs(comp.name);
            return (
              <div key={comp.id} className="company-card">
                <div>
                  <div className="company-card-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <CompanyLogo name={comp.name} slug={comp.slug} size={42} />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff" }}>
                            {comp.name}
                          </h3>
                          {comp.verified && <IconVerified size={14} />}
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {comp.category}
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--accent-sky)",
                        background: "rgba(56, 189, 248, 0.08)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: 4,
                        border: "1px solid rgba(56, 189, 248, 0.2)"
                      }}
                    >
                      {comp.stage}
                    </span>
                  </div>

                  <p className="company-card-bio" style={{ marginTop: "1rem" }}>
                    {comp.tagline}
                  </p>

                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "1rem" }}>
                    {comp.techStack?.slice(0, 4).map((tech) => (
                      <span key={tech} className="badge badge-tag" style={{ fontSize: "0.7rem" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer metadata & action */}
                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
                  <div className="company-card-meta" style={{ marginBottom: "0.75rem" }}>
                    <span>📍 {comp.remotePolicy}</span>
                    <span>•</span>
                    <span>👥 {comp.employees}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button
                      onClick={() => setActiveCompanyDrawer(comp)}
                      className="btn-ghost"
                      style={{ fontSize: "0.8rem", padding: "0.3rem 0" }}
                    >
                      View Culture Dossier →
                    </button>

                    <Link
                      to="/"
                      className="btn-secondary"
                      style={{ padding: "0.3rem 0.7rem", fontSize: "0.775rem" }}
                    >
                      {companyJobs.length} {companyJobs.length === 1 ? "Role" : "Roles"} Active
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Slide-Over Company Dossier Modal ── */}
      {activeCompanyDrawer && (
        <div className="modal-overlay" onClick={() => setActiveCompanyDrawer(null)}>
          <div className="modal-content-card" style={{ maxWidth: 620 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <CompanyLogo name={activeCompanyDrawer.name} slug={activeCompanyDrawer.slug} size={50} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#ffffff" }}>
                      {activeCompanyDrawer.name}
                    </h2>
                    <IconVerified size={16} />
                  </div>
                  <span style={{ fontSize: "0.825rem", color: "var(--text-secondary)" }}>
                    {activeCompanyDrawer.headquarters} • {activeCompanyDrawer.stage}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveCompanyDrawer(null)}
                className="btn-ghost"
                style={{ padding: "0.3rem" }}
                aria-label="Close"
              >
                <IconClose size={18} />
              </button>
            </div>

            <p style={{ fontSize: "0.925rem", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              {activeCompanyDrawer.about}
            </p>

            {/* Core Tech Stack */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                Primary Production Stack
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {activeCompanyDrawer.techStack?.map((item) => (
                  <span key={item} className="badge badge-tag" style={{ padding: "0.3rem 0.65rem", fontSize: "0.8rem" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Perks & Benefits */}
            <div style={{ marginBottom: "1.75rem" }}>
              <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                Verified Compensation & Perks
              </h4>
              <ul className="job-bullets-list">
                {activeCompanyDrawer.benefits?.map((benefit, i) => (
                  <li key={i} className="job-bullet-item">
                    <IconCheck size={14} style={{ color: "var(--accent-emerald)", flexShrink: 0, marginTop: 4 }} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Openings at this company */}
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.75rem" }}>
                Current Verified Openings ({getCompanyJobs(activeCompanyDrawer.name).length})
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {getCompanyJobs(activeCompanyDrawer.name).map((j) => (
                  <Link
                    key={j.id}
                    to={`/jobs/${j.id}`}
                    onClick={() => setActiveCompanyDrawer(null)}
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.75rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#ffffff" }}>{j.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{j.location} • {j.workMode}</div>
                    </div>
                    <span className="badge badge-salary">{j.salary}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
