import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompanyLogo } from "../components/CompanyLogos";
import {
  IconCheck,
  IconClock,
  IconBookmark,
  IconArrowRight,
  IconBriefcase,
  IconUser,
  IconUpload,
  IconExternalLink
} from "../components/Icons";
import { api, getSavedJobIds, toggleSavedJobId } from "../api";

export default function DashboardPage({ user }) {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Employer Post Job Form State
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    companyName: "Vercel",
    location: "Remote (Global)",
    salaryMin: "185000",
    salaryMax: "235000",
    requirements: "TypeScript, React, Rust, Next.js",
    description: "Join our platform infrastructure team to architect high-performance edge compute runtimes and developer deployment pipelines."
  });
  const [postingJob, setPostingJob] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const currentUser = user || {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "jobseeker",
    title: "Senior Systems & Frontend Engineer"
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [appsRes, jobsRes] = await Promise.all([
        api.getApplications(),
        api.getJobs()
      ]);
      if (appsRes.success) setApplications(appsRes.data);
      if (jobsRes.success) {
        setAllJobs(jobsRes.data);
        const savedIds = getSavedJobIds();
        setSavedJobs(jobsRes.data.filter((j) => savedIds.includes(j.id)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRemoveBookmark = (jobId) => {
    const updated = toggleSavedJobId(jobId);
    setSavedJobs(allJobs.filter((j) => updated.includes(j.id)));
    window.dispatchEvent(new Event("bookmarksUpdated"));
    showToast("Removed from saved roles");
  };

  const handlePostJobSubmit = async (e) => {
    e.preventDefault();
    if (!newJobForm.title.trim()) return;
    setPostingJob(true);
    try {
      await api.createJob({
        title: newJobForm.title,
        companyName: newJobForm.companyName,
        location: newJobForm.location,
        salaryMin: Number(newJobForm.salaryMin),
        salaryMax: Number(newJobForm.salaryMax),
        requirements: newJobForm.requirements,
        description: newJobForm.description
      });
      setPostSuccess(true);
      await loadData();
      setTimeout(() => {
        setPostSuccess(false);
        setActiveTab("applications");
        showToast("Job opening published to live directory!");
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setPostingJob(false);
    }
  };

  // Group applications by status for Kanban Pipeline
  const pipelineSubmitted = applications.filter((a) => !a.status || a.status === "submitted");
  const pipelineScreening = applications.filter((a) => a.status === "screening");
  const pipelineInterviewing = applications.filter((a) => a.status === "interviewing");
  const pipelineOffer = applications.filter((a) => a.status === "offer");

  return (
    <div className="dashboard-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="toast-notice">
          <IconCheck size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Candidate / Employer Executive Header ── */}
      <div className="dashboard-user-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-sm)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-medium)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#ffffff"
            }}
          >
            {currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}>
                {currentUser.name}
              </h2>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--accent-emerald)",
                  background: "rgba(16, 185, 129, 0.08)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: 4,
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}
              >
                {currentUser.role === "employer" ? "Verified Recruiter" : "Verified Candidate"}
              </span>
            </div>
            <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)" }}>
              {currentUser.email} • Target Comp: $190k – $240k
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("post_job")}
            className={activeTab === "post_job" ? "btn-primary" : "btn-secondary"}
            style={{ fontSize: "0.825rem" }}
          >
            + Post Job Opening
          </button>
          <Link to="/" className="btn-secondary" style={{ fontSize: "0.825rem" }}>
            Browse Board
          </Link>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="dashboard-tabs-nav">
        <button
          className={`dashboard-tab-btn ${activeTab === "applications" ? "active" : ""}`}
          onClick={() => setActiveTab("applications")}
        >
          <span>Application Pipeline</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", opacity: 0.7 }}>
            ({applications.length})
          </span>
        </button>

        <button
          className={`dashboard-tab-btn ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          <span>Saved Roles</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", opacity: 0.7 }}>
            ({savedJobs.length})
          </span>
        </button>

        <button
          className={`dashboard-tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <span>Technical Profile & Resume</span>
        </button>

        <button
          className={`dashboard-tab-btn ${activeTab === "post_job" ? "active" : ""}`}
          onClick={() => setActiveTab("post_job")}
        >
          <span>Employer Studio</span>
        </button>
      </div>

      {/* ── Tab 1: Application Kanban Pipeline ── */}
      {activeTab === "applications" && (
        <div>
          <div className="pipeline-columns-grid">
            {/* Column 1: Submitted */}
            <div className="pipeline-col">
              <div className="pipeline-col-header">
                <span>1. Dispatched</span>
                <span>{pipelineSubmitted.length}</span>
              </div>
              {pipelineSubmitted.map((app) => (
                <div key={app._id} className="pipeline-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {app.job?.company || "Linear"}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                      Recent
                    </span>
                  </div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                    {app.job?.title || app.role}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    {app.notes || "Sent directly to team."}
                  </p>
                </div>
              ))}
              {pipelineSubmitted.length === 0 && (
                <span style={{ fontSize: "0.775rem", color: "var(--text-faint)", textAlign: "center", padding: "1rem 0" }}>
                  No active items
                </span>
              )}
            </div>

            {/* Column 2: Screening */}
            <div className="pipeline-col">
              <div className="pipeline-col-header">
                <span>2. Review & Screen</span>
                <span>{pipelineScreening.length}</span>
              </div>
              {pipelineScreening.map((app) => (
                <div key={app._id} className="pipeline-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {app.job?.company || app.company}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--accent-sky)" }}>
                      Screen
                    </span>
                  </div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                    {app.job?.title || app.role}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    {app.notes}
                  </p>
                </div>
              ))}
              {pipelineScreening.length === 0 && (
                <span style={{ fontSize: "0.775rem", color: "var(--text-faint)", textAlign: "center", padding: "1rem 0" }}>
                  No active items
                </span>
              )}
            </div>

            {/* Column 3: Interviewing */}
            <div className="pipeline-col">
              <div className="pipeline-col-header">
                <span>3. Technical Rounds</span>
                <span>{pipelineInterviewing.length}</span>
              </div>
              {pipelineInterviewing.map((app) => (
                <div key={app._id} className="pipeline-card" style={{ borderColor: "rgba(129, 140, 248, 0.3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {app.job?.company || app.company}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--accent-indigo)" }}>
                      Architecture
                    </span>
                  </div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                    {app.job?.title || app.role}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    {app.notes}
                  </p>
                </div>
              ))}
              {pipelineInterviewing.length === 0 && (
                <span style={{ fontSize: "0.775rem", color: "var(--text-faint)", textAlign: "center", padding: "1rem 0" }}>
                  No active items
                </span>
              )}
            </div>

            {/* Column 4: Offer */}
            <div className="pipeline-col">
              <div className="pipeline-col-header">
                <span>4. Offer Extended</span>
                <span>{pipelineOffer.length}</span>
              </div>
              {pipelineOffer.map((app) => (
                <div key={app._id} className="pipeline-card" style={{ borderColor: "rgba(16, 185, 129, 0.4)", background: "rgba(16, 185, 129, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {app.job?.company || app.company}
                    </span>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--accent-emerald)" }}>
                      Formal Offer
                    </span>
                  </div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                    {app.job?.title || app.role}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    {app.notes}
                  </p>
                </div>
              ))}
              {pipelineOffer.length === 0 && (
                <span style={{ fontSize: "0.775rem", color: "var(--text-faint)", textAlign: "center", padding: "1rem 0" }}>
                  No active items
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Saved Roles ── */}
      {activeTab === "saved" && (
        <div>
          {savedJobs.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <CompanyLogo name={job.company} slug={job.companySlug} size={40} />
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#ffffff" }}>{job.title}</h4>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        {job.company} • {job.location} ({job.workMode})
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span className="badge badge-salary">{job.salary}</span>
                    <Link to={`/jobs/${job.id}`} className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.35rem 0.85rem" }}>
                      View Spec
                    </Link>
                    <button
                      onClick={() => handleRemoveBookmark(job.id)}
                      className="btn-ghost"
                      style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "3rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>No saved roles yet</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                Click the bookmark icon on any job card to save listings for later review.
              </p>
              <Link to="/" className="btn-secondary">
                Explore open jobs
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 3: Candidate Technical Profile & ATS Preview ── */}
      {activeTab === "profile" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem" }}>
              Technical Candidate Dossier
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <span className="form-field-label">Target Roles</span>
                <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#ffffff", marginTop: "0.2rem" }}>
                  Staff Systems Engineer / Lead Frontend
                </p>
              </div>
              <div>
                <span className="form-field-label">Preferred Arrangement</span>
                <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "#ffffff", marginTop: "0.2rem" }}>
                  Remote (Worldwide / UTC-8 to UTC+2)
                </p>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <span className="form-field-label">Verified Core Technologies</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem" }}>
                {["Rust", "TypeScript", "React", "Distributed Systems", "PostgreSQL", "Next.js", "Docker", "Wasm"].map((s) => (
                  <span key={s} className="badge badge-tag" style={{ padding: "0.3rem 0.65rem" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="form-field-label">Active Resume Document</span>
              <div className="file-dropzone-box" style={{ marginTop: "0.4rem", textAlign: "left", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#ffffff" }}>
                    alex-rivera-systems-resume.pdf
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Updated 3 days ago • PDF 142 KB
                  </span>
                </div>
                <button className="btn-secondary" style={{ fontSize: "0.775rem", padding: "0.3rem 0.65rem" }}>
                  Replace
                </button>
              </div>
            </div>
          </div>

          {/* ATS Readiness Audit */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Readiness Audit
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "0.4rem" }}>
              <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--accent-emerald)", fontFamily: "var(--font-mono)" }}>
                96%
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>ATS Index Score</span>
            </div>

            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <IconCheck size={14} style={{ color: "var(--accent-emerald)" }} />
                <span>Clean machine-readable typography format</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <IconCheck size={14} style={{ color: "var(--accent-emerald)" }} />
                <span>Distributed systems keywords detected</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <IconCheck size={14} style={{ color: "var(--accent-emerald)" }} />
                <span>Direct GitHub and technical portfolio linked</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 4: Employer Job Posting Studio ── */}
      {activeTab === "post_job" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>
          {/* Post Form */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-lg)", padding: "2rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.35rem" }}>
              Publish a Verified Opening
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.825rem", marginBottom: "1.5rem" }}>
              Listings appear on INDEX immediately with direct applicant delivery to your inbox.
            </p>

            <form onSubmit={handlePostJobSubmit}>
              <div className="form-group-field">
                <label className="form-field-label">Role Title *</label>
                <input
                  type="text"
                  className="minimal-input"
                  placeholder="e.g. Senior Distributed Systems Engineer"
                  value={newJobForm.title}
                  onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group-field">
                  <label className="form-field-label">Hiring Company *</label>
                  <input
                    type="text"
                    className="minimal-input"
                    value={newJobForm.companyName}
                    onChange={(e) => setNewJobForm({ ...newJobForm, companyName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-field">
                  <label className="form-field-label">Location / Arrangement *</label>
                  <input
                    type="text"
                    className="minimal-input"
                    value={newJobForm.location}
                    onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group-field">
                  <label className="form-field-label">Min Base Salary ($)</label>
                  <input
                    type="number"
                    className="minimal-input"
                    value={newJobForm.salaryMin}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salaryMin: e.target.value })}
                  />
                </div>
                <div className="form-group-field">
                  <label className="form-field-label">Max Base Salary ($)</label>
                  <input
                    type="number"
                    className="minimal-input"
                    value={newJobForm.salaryMax}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salaryMax: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Required Technologies (Comma separated)</label>
                <input
                  type="text"
                  className="minimal-input"
                  value={newJobForm.requirements}
                  onChange={(e) => setNewJobForm({ ...newJobForm, requirements: e.target.value })}
                />
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Role Overview & Responsibilities *</label>
                <textarea
                  className="minimal-input"
                  rows={4}
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={postingJob}
                  style={{ padding: "0.6rem 1.5rem" }}
                >
                  {postingJob ? "Publishing..." : "Publish Opening to Directory"}
                </button>
              </div>
            </form>
          </div>

          {/* Live Card Preview */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Live Feed Preview
            </span>
            <div style={{ marginTop: "1rem", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <CompanyLogo name={newJobForm.companyName} size={34} />
                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>
                    {newJobForm.title || "Your Job Title Here"}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {newJobForm.companyName} • {newJobForm.location}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "0.5rem", marginTop: "0.5rem" }}>
                <span className="badge badge-salary">
                  ${Number(newJobForm.salaryMin || 0) / 1000}k – ${Number(newJobForm.salaryMax || 0) / 1000}k
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--accent-sky)" }}>Just now</span>
              </div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem", lineHeight: 1.4 }}>
              Preview updates in real time. Candidates will be able to bookmark and apply directly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
