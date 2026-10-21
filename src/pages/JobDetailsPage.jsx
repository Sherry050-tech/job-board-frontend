import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CompanyLogo } from "../components/CompanyLogos";
import {
  IconArrowLeft,
  IconBookmark,
  IconShare,
  IconVerified,
  IconMapPin,
  IconDollar,
  IconBriefcase,
  IconClock,
  IconExternalLink,
  IconCheck,
  IconClose,
  IconUpload
} from "../components/Icons";
import { api, getSavedJobIds, toggleSavedJobId } from "../api";

export default function JobDetailsPage({ user }) {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Application Drawer State
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: user?.name || "Alex Rivera",
    email: user?.email || "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    resumeFileName: "alex-rivera-systems-resume.pdf",
    portfolioUrl: "https://github.com/alexrivera",
    coverNote: ""
  });
  const [applySubmitting, setApplySubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchJobData = async () => {
      setLoading(true);
      try {
        const res = await api.getJob(id);
        if (active && res.success && res.data) {
          setJob(res.data);
          const savedList = getSavedJobIds();
          setIsSaved(savedList.includes(res.data.id));

          // Fetch similar jobs
          const allRes = await api.getJobs();
          if (allRes.success) {
            setSimilarJobs(
              allRes.data
                .filter((j) => j.id !== res.data.id)
                .slice(0, 2)
            );
          }
        }
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchJobData();
    return () => {
      active = false;
    };
  }, [id]);

  const handleToggleBookmark = () => {
    if (!job) return;
    const updated = toggleSavedJobId(job.id);
    setIsSaved(updated.includes(job.id));
    window.dispatchEvent(new Event("bookmarksUpdated"));
    showToast(updated.includes(job.id) ? "Saved to your bookmarks" : "Removed from bookmarks");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard");
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplySubmitting(true);
    try {
      await api.applyForJob(job.id, {
        applicantName: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone,
        coverLetter: applyForm.coverNote,
        resumeURL: applyForm.portfolioUrl || "https://example.com/resume.pdf"
      });
      setApplySuccess(true);
      setTimeout(() => {
        setApplySuccess(false);
        setShowApplyModal(false);
        showToast("Application submitted directly to hiring team!");
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setApplySubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "6rem 0", textAlign: "center" }}>
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
    );
  }

  if (!job) {
    return (
      <div className="job-details-container" style={{ textAlign: "center", paddingTop: "5rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Listing not found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
          This position may have been filled or the link has expired.
        </p>
        <Link to="/" className="btn-secondary">
          <IconArrowLeft size={14} /> Back to active jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <IconCheck size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back link */}
      <Link to="/" className="back-link-bar">
        <IconArrowLeft size={14} />
        <span>Return to all jobs</span>
      </Link>

      {/* ── Masthead Card ── */}
      <div className="job-details-header-card">
        <div className="job-details-header-top">
          <div className="job-company-identity">
            <CompanyLogo name={job.company} slug={job.companySlug} size={54} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {job.company}
                </span>
                {job.verified && <IconVerified size={15} />}
                <span style={{ color: "var(--text-muted)" }}>•</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {job.department || "Engineering"}
                </span>
              </div>
              <h1 className="job-primary-heading">{job.title}</h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={handleToggleBookmark}
              className={`btn-icon-square ${isSaved ? "active" : ""}`}
              style={{ width: 40, height: 40 }}
              title={isSaved ? "Saved" : "Save role"}
            >
              <IconBookmark size={18} filled={isSaved} />
            </button>
            <button
              onClick={handleShare}
              className="btn-icon-square"
              style={{ width: 40, height: 40 }}
              title="Share role"
            >
              <IconShare size={18} />
            </button>
            <button
              onClick={() => setShowApplyModal(true)}
              className="btn-primary"
              style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
            >
              Apply for this role
            </button>
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="job-meta-grid">
          <div className="job-meta-cell">
            <span className="job-meta-cell-label">Compensation</span>
            <span className="job-meta-cell-value" style={{ color: "var(--accent-emerald)" }}>
              {job.salary}
            </span>
          </div>

          <div className="job-meta-cell">
            <span className="job-meta-cell-label">Location / Mode</span>
            <span className="job-meta-cell-value">
              {job.location} ({job.workMode || "Remote"})
            </span>
          </div>

          <div className="job-meta-cell">
            <span className="job-meta-cell-label">Equity Package</span>
            <span className="job-meta-cell-value" style={{ fontFamily: "var(--font-mono)" }}>
              {job.equity || "Standard option grant"}
            </span>
          </div>

          <div className="job-meta-cell">
            <span className="job-meta-cell-label">Freshness</span>
            <span className="job-meta-cell-value">{job.postedAt}</span>
          </div>
        </div>
      </div>

      {/* ── Main Two Column Layout ── */}
      <div className="job-content-columns">
        {/* Left: Detailed Role Specification */}
        <div className="job-article-body">
          {/* Section: Overview */}
          <div className="job-section-card">
            <h2 className="job-section-title">Role Overview</h2>
            <p className="job-prose-text" style={{ whiteSpace: "pre-line" }}>
              {job.description}
            </p>
          </div>

          {/* Section: Responsibilities */}
          {job.responsibilities && (
            <div className="job-section-card">
              <h2 className="job-section-title">What You'll Own & Build</h2>
              <ul className="job-bullets-list">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="job-bullet-item">
                    <span className="bullet-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Requirements & Tech Stack */}
          <div className="job-section-card">
            <h2 className="job-section-title">Requirements & Technical Standards</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.25rem" }}>
              {job.tags?.map((tag) => (
                <span key={tag} className="badge badge-tag" style={{ padding: "0.3rem 0.65rem", fontSize: "0.8rem" }}>
                  {tag}
                </span>
              ))}
            </div>

            <ul className="job-bullets-list">
              {job.requirements?.map((req, idx) => (
                <li key={idx} className="job-bullet-item">
                  <span className="bullet-dot" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Transparent Interview Process */}
          <div className="job-section-card">
            <h2 className="job-section-title">Interview Process Breakdown</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1rem" }}>
              We value your engineering time. Zero multi-week ghosting; direct feedback at every stage.
            </p>

            <div className="roadmap-timeline">
              {job.interviewProcess?.map((step) => (
                <div key={step.step} className="roadmap-step">
                  <div className="roadmap-marker">{step.step}</div>
                  <div className="roadmap-step-title">
                    <span>{step.title}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        background: "rgba(255,255,255,0.04)",
                        padding: "0.1rem 0.4rem",
                        borderRadius: 4
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="roadmap-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Roles Strip */}
          {similarJobs.length > 0 && (
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "1rem" }}>
                Similar Active Openings
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {similarJobs.map((sim) => (
                  <Link
                    key={sim.id}
                    to={`/jobs/${sim.id}`}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      padding: "1rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <CompanyLogo name={sim.company} slug={sim.companySlug} size={32} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.925rem", color: "#ffffff" }}>{sim.title}</div>
                        <div style={{ fontSize: "0.775rem", color: "var(--text-secondary)" }}>
                          {sim.company} • {sim.location}
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-salary">{sim.salary}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sticky Action Sidebar */}
        <aside className="sticky-sidebar-card">
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Interested in this position?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.825rem", lineHeight: 1.5 }}>
              Applications submitted through INDEX go directly to {job.company}'s engineering leads with an average response time of under 48 hours.
            </p>
          </div>

          <button
            onClick={() => setShowApplyModal(true)}
            className="btn-primary"
            style={{ width: "100%", padding: "0.65rem", fontSize: "0.9rem" }}
          >
            Apply Now
          </button>

          <button
            onClick={handleToggleBookmark}
            className="btn-secondary"
            style={{ width: "100%", padding: "0.65rem", fontSize: "0.85rem" }}
          >
            <IconBookmark size={15} filled={isSaved} />
            <span>{isSaved ? "Saved in Workspace" : "Bookmark Role"}</span>
          </button>

          <hr style={{ border: "none", borderTop: "1px solid var(--border-subtle)" }} />

          {/* Quick Company Info */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              }}
            >
              Hiring Organization
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
              <CompanyLogo name={job.company} slug={job.companySlug} size={36} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.925rem" }}>{job.company}</div>
                <div style={{ fontSize: "0.775rem", color: "var(--text-secondary)" }}>Verified Partner</div>
              </div>
            </div>

            <Link
              to="/companies"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--accent-sky)",
                fontSize: "0.8rem",
                textDecoration: "none",
                marginTop: "0.75rem"
              }}
            >
              View company dossier <IconExternalLink size={12} />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── Slide-Over Application Modal ── */}
      {showApplyModal && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}
                >
                  Direct Application
                </span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", marginTop: "0.2rem" }}>
                  {job.title}
                </h2>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>at {job.company}</span>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="btn-ghost"
                style={{ padding: "0.4rem", color: "var(--text-muted)" }}
                aria-label="Close modal"
              >
                <IconClose size={18} />
              </button>
            </div>

            {applySuccess ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "var(--accent-emerald)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem"
                  }}
                >
                  <IconCheck size={24} />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem" }}>
                  Application Dispatched
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  Your profile and technical assets have been securely forwarded to {job.company}'s engineering review committee.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit}>
                <div className="form-group-field">
                  <label className="form-field-label">Full Name</label>
                  <input
                    type="text"
                    className="minimal-input"
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label className="form-field-label">Email Address</label>
                  <input
                    type="email"
                    className="minimal-input"
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label className="form-field-label">GitHub, Portfolio, or LinkedIn URL</label>
                  <input
                    type="url"
                    className="minimal-input"
                    placeholder="https://github.com/yourhandle"
                    value={applyForm.portfolioUrl}
                    onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                    required
                  />
                </div>

                {/* Simulated Drag & Drop Resume */}
                <div className="form-group-field">
                  <label className="form-field-label">Curriculum Vitae / Resume</label>
                  <div className="file-dropzone-box">
                    <IconUpload size={22} style={{ color: "var(--accent-sky)", margin: "0 auto 0.5rem", display: "block" }} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {applyForm.resumeFileName}
                    </span>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                      PDF, DOCX up to 10MB • Drag new file to replace
                    </p>
                  </div>
                </div>

                <div className="form-group-field">
                  <label className="form-field-label">Cover Note / Key Projects (Optional)</label>
                  <textarea
                    className="minimal-input"
                    rows={3}
                    placeholder="Highlight 1 or 2 relevant projects or systems you've architected..."
                    value={applyForm.coverNote}
                    onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={applySubmitting}
                  >
                    {applySubmitting ? "Transmitting..." : "Submit Direct Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
