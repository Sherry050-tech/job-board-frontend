import { useState, useEffect, useMemo, useRef } from "react";
import JobCard from "../components/JobCard";
import { CompanyLogo } from "../components/CompanyLogos";
import { IconSearch, IconFilter, IconArrowRight, IconClose, IconVerified, IconMapPin, IconBriefcase } from "../components/Icons";
import { api } from "../api";
import { Link } from "react-router-dom";

const CATEGORIES = [
  "All Roles",
  "Frontend & UI",
  "Backend & Systems",
  "AI & Machine Learning",
  "Product & Design",
  "Infra & DevOps"
];

const WORK_MODES = ["All Modes", "Remote", "Hybrid", "On-site"];
const SORT_OPTIONS = [
  { value: "latest", label: "Recently Added" },
  { value: "salary_high", label: "Highest Base Salary" },
  { value: "company", label: "Company Name" }
];

const POPULAR_SEARCHES = [
  { label: "Remote", type: "mode", value: "Remote" },
  { label: "React", type: "query", value: "React" },
  { label: "Python", type: "query", value: "Python" },
  { label: "AI & ML", type: "category", value: "AI & Machine Learning" },
  { label: "Staff Engineer", type: "query", value: "Staff" },
  { label: "Distributed Systems", type: "query", value: "Systems" },
  { label: "Stripe", type: "query", value: "Stripe" }
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Roles");
  const [activeWorkMode, setActiveWorkMode] = useState("All Modes");
  const [sortBy, setSortBy] = useState("latest");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  // Keyboard shortcut listener for '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch jobs
  useEffect(() => {
    let active = true;
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await api.getJobs({
          keyword: query,
          category: activeCategory === "All Roles" ? "All" : activeCategory,
          workMode: activeWorkMode === "All Modes" ? undefined : activeWorkMode
        });
        if (active && res.success) {
          let list = res.data;
          if (locationQuery.trim()) {
            const locLower = locationQuery.toLowerCase();
            list = list.filter(
              (j) =>
                j.location?.toLowerCase().includes(locLower) ||
                j.workMode?.toLowerCase().includes(locLower)
            );
          }
          setJobs(list);
        }
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    const timer = setTimeout(fetchJobs, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, locationQuery, activeCategory, activeWorkMode]);

  // Sort jobs
  const sortedJobs = useMemo(() => {
    const list = [...jobs];
    if (sortBy === "salary_high") {
      return list.sort((a, b) => (b.salaryMin || 0) - (a.salaryMin || 0));
    }
    if (sortBy === "company") {
      return list.sort((a, b) => a.company.localeCompare(b.company));
    }
    return list;
  }, [jobs, sortBy]);

  const handleQuickTagClick = (tag) => {
    if (tag.type === "mode") {
      setActiveWorkMode(tag.value);
    } else if (tag.type === "category") {
      setActiveCategory(tag.value);
    } else if (tag.type === "query") {
      setQuery(tag.value);
    }
  };

  const handleResetFilters = () => {
    setQuery("");
    setLocationQuery("");
    setActiveCategory("All Roles");
    setActiveWorkMode("All Modes");
  };

  const hasActiveFilters =
    Boolean(query) ||
    Boolean(locationQuery) ||
    activeCategory !== "All Roles" ||
    activeWorkMode !== "All Modes";

  return (
    <>
      {/* ── Welcoming Hero Section ── */}
      <section className="editorial-hero">
        <div className="editorial-hero-inner">
          <div className="hero-kicker">
            <span style={{ color: "var(--accent-emerald)" }}>●</span>
            <span>Verified Tech Job Board & Directory</span>
          </div>

          <h1 className="hero-main-title">
            Find your next high-impact role in tech.
          </h1>

          <p className="hero-main-subtitle">
            Explore 1,200+ curated engineering, AI research, systems, and product design roles.
            Direct access to hiring teams, verified salary ranges, and zero recruiter spam.
          </p>

          {/* ── Real Job Board Unified Search Bar (Indeed / LinkedIn style) ── */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-medium)",
              borderRadius: "14px",
              padding: "0.5rem",
              boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem"
            }}
          >
            {/* Input 1: Title, Stack or Company */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: "1 1 300px",
                padding: "0.6rem 0.9rem",
                gap: "0.65rem"
              }}
            >
              <IconSearch size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                className="search-input-field"
                placeholder="Job title, tech stack (React, Rust, Go), or company..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="btn-ghost"
                  style={{ padding: "0.2rem", color: "var(--text-muted)" }}
                  aria-label="Clear search"
                >
                  <IconClose size={14} />
                </button>
              )}
            </div>

            {/* Vertical Divider */}
            <div
              style={{
                width: "1px",
                height: "32px",
                backgroundColor: "var(--border-subtle)",
                display: "none"
              }}
              className="search-divider"
            />

            {/* Input 2: Location / Remote */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: "1 1 200px",
                padding: "0.6rem 0.9rem",
                borderLeft: "1px solid var(--border-subtle)",
                gap: "0.65rem"
              }}
            >
              <IconMapPin size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                type="text"
                className="search-input-field"
                placeholder="City, State, or 'Remote'..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
              {locationQuery && (
                <button
                  onClick={() => setLocationQuery("")}
                  className="btn-ghost"
                  style={{ padding: "0.2rem", color: "var(--text-muted)" }}
                  aria-label="Clear location"
                >
                  <IconClose size={14} />
                </button>
              )}
            </div>

            {/* Search Submit Button */}
            <button
              onClick={() => searchInputRef.current?.focus()}
              className="btn-primary"
              style={{ padding: "0.75rem 1.6rem", fontSize: "0.925rem", borderRadius: "10px" }}
            >
              Find Jobs
            </button>
          </div>

          {/* Quick Popular Search Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", fontSize: "0.825rem", color: "var(--text-muted)" }}>
            <span style={{ fontWeight: 600 }}>Trending:</span>
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag.label}
                onClick={() => handleQuickTagClick(tag)}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "6px",
                  padding: "0.2rem 0.6rem",
                  fontSize: "0.775rem",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.color = "var(--accent-primary)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Metrics bar */}
          <div className="hero-metrics-bar">
            <div className="metric-cell">
              <div className="metric-value">1,200+</div>
              <div className="metric-label">Verified Openings</div>
            </div>
            <div className="metric-cell">
              <div className="metric-value">$185k</div>
              <div className="metric-label">Median Base Salary</div>
            </div>
            <div className="metric-cell">
              <div className="metric-value">85%</div>
              <div className="metric-label">Remote / Hybrid Available</div>
            </div>
            <div className="metric-cell">
              <div className="metric-value">&lt;48h</div>
              <div className="metric-label">Direct Team Response Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Spotlight Hiring Teams Bar ── */}
      <div style={{ maxWidth: 1040, margin: "1.75rem auto 0", padding: "0 1.5rem" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "0.9rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "var(--shadow-xs)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em"
              }}
            >
              Hiring Now:
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link to="/companies" style={{ display: "flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 600 }}>
                <CompanyLogo name="Linear" slug="linear" size={22} />
                <span>Linear</span>
              </Link>
              <span style={{ color: "var(--border-medium)" }}>•</span>
              <Link to="/companies" style={{ display: "flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 600 }}>
                <CompanyLogo name="Anthropic" slug="anthropic" size={22} />
                <span>Anthropic</span>
              </Link>
              <span style={{ color: "var(--border-medium)" }}>•</span>
              <Link to="/companies" style={{ display: "flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 600 }}>
                <CompanyLogo name="Supabase" slug="supabase" size={22} />
                <span>Supabase</span>
              </Link>
              <span style={{ color: "var(--border-medium)" }}>•</span>
              <Link to="/companies" style={{ display: "flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 600 }}>
                <CompanyLogo name="Stripe" slug="stripe" size={22} />
                <span>Stripe</span>
              </Link>
            </div>
          </div>

          <Link
            to="/companies"
            style={{
              color: "var(--accent-primary)",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem"
            }}
          >
            Explore all companies <IconArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── Category & Faceted Filter Strip ── */}
      <div className="feed-controls-wrap">
        <div className="filter-strip">
          <div className="filter-pills-group">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-tab-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <select
              value={activeWorkMode}
              onChange={(e) => setActiveWorkMode(e.target.value)}
              className="secondary-filter-select"
              aria-label="Filter by work mode"
            >
              {WORK_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="secondary-filter-select"
              aria-label="Sort jobs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Job Feed ── */}
      <section className="feed-content-wrap">
        <div className="feed-header-line">
          <span>
            Showing <strong style={{ color: "var(--text-primary)" }}>{sortedJobs.length}</strong> active roles
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="btn-ghost"
              style={{ fontSize: "0.8rem", padding: "0.25rem 0.65rem", color: "var(--accent-primary)", fontWeight: 600 }}
            >
              Clear all filters
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                width: 32,
                height: 32,
                border: "3px solid #e2e8f0",
                borderTopColor: "var(--accent-primary)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }}
            />
          </div>
        ) : sortedJobs.length > 0 ? (
          <div className="job-rows-container">
            {sortedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "4rem 2rem",
              textAlign: "center",
              boxShadow: "var(--shadow-xs)"
            }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              No matching listings found
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: 460, margin: "0 auto 1.5rem" }}>
              We couldn't find any roles matching your current search criteria. Try relaxing your filters or searching for different keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn-primary"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
