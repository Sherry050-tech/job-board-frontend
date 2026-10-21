import { jobs as initialJobs, companies as initialCompanies, sampleApplications } from "./mockData";

const API_BASE_URL = "http://localhost:3000";

// Local storage keys for persistent demo state
const STORAGE_JOBS_KEY = "techjobs_listings";
const STORAGE_APPS_KEY = "techjobs_applications";
const STORAGE_SAVED_KEY = "techjobs_saved_roles";

// Initialize mock storage if empty
const getStoredJobs = () => {
  try {
    const saved = localStorage.getItem(STORAGE_JOBS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Storage parse error:", e);
  }
  return initialJobs;
};

const saveStoredJobs = (jobs) => {
  try {
    localStorage.setItem(STORAGE_JOBS_KEY, JSON.stringify(jobs));
  } catch (e) {
    console.error("Storage write error:", e);
  }
};

const getStoredApplications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_APPS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Storage parse error:", e);
  }
  return sampleApplications;
};

const saveStoredApplications = (apps) => {
  try {
    localStorage.setItem(STORAGE_APPS_KEY, JSON.stringify(apps));
  } catch (e) {
    console.error("Storage write error:", e);
  }
};

// Saved bookmarks helper
export const getSavedJobIds = () => {
  try {
    const saved = localStorage.getItem(STORAGE_SAVED_KEY);
    return saved ? JSON.parse(saved) : ["job-1", "job-3"];
  } catch {
    return ["job-1", "job-3"];
  }
};

export const toggleSavedJobId = (id) => {
  try {
    const current = getSavedJobIds();
    const updated = current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id];
    localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

/**
 * Maps backend job object structure to frontend UI model if backend is used.
 */
export const mapBackendJobToFrontend = (job) => {
  if (!job) return null;

  const formattedType = job.type
    ? job.type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("-")
    : "Full-time";

  let formattedSalary = "$150k – $190k";
  if (job.salaryMin && job.salaryMax) {
    formattedSalary = `$${job.salaryMin / 1000}k – $${job.salaryMax / 1000}k`;
  } else if (job.salaryMin) {
    formattedSalary = `$${job.salaryMin / 1000}k+`;
  }

  return {
    id: job._id || job.id,
    title: job.title,
    company: job.company?.name || job.company || "Unknown Company",
    companySlug: (job.company?.name || job.company || "").toLowerCase().replace(/[^a-z0-9]/g, ""),
    location: job.location || "Remote",
    workMode: job.workMode || (job.location?.toLowerCase().includes("remote") ? "Remote" : "Hybrid"),
    type: formattedType,
    salary: job.salary || formattedSalary,
    tags: job.requirements || job.tags || ["TypeScript", "Fullstack"],
    category: job.category || "Frontend & UI",
    postedAt: job.postedAt || "Recently",
    featured: job.featured || false,
    verified: true,
    summary: job.summary || job.description?.slice(0, 160) + "...",
    description: job.description,
    responsibilities: job.responsibilities || [
      "Design and maintain scalable product features.",
      "Collaborate cross-functionally with engineers and designers.",
      "Ship clean, tested, reliable production code."
    ],
    requirements: job.requirements || ["3+ years relevant engineering experience."],
    interviewProcess: job.interviewProcess || [
      { step: "1", title: "Recruiter Screen", duration: "30 min", desc: "Introduction and expectations." },
      { step: "2", title: "Technical Deep Dive", duration: "60 min", desc: "System architecture and coding." },
      { step: "3", title: "Final Team Chat", duration: "45 min", desc: "Team fit and offer details." }
    ]
  };
};

/**
 * Main API client with automatic graceful offline/local fallback.
 */
export const api = {
  // Auth endpoints
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Offline fallback: simulate successful login
    }
    const isEmployer = email.toLowerCase().includes("employer");
    const demoUser = {
      _id: isEmployer ? "user-employer-1" : "user-seeker-1",
      name: isEmployer ? "Sarah Chen (Vercel Recruiting)" : "Alex Rivera",
      email: email || "alex.rivera@example.com",
      role: isEmployer ? "employer" : "jobseeker",
      title: isEmployer ? "Head of Talent" : "Senior Systems Engineer",
      avatar: ""
    };
    localStorage.setItem("token", "demo-token-" + Date.now());
    localStorage.setItem("techjobs_current_user", JSON.stringify(demoUser));
    return { success: true, token: "demo-token", data: demoUser };
  },

  register: async (name, email, password, role) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const newUser = {
      _id: "user-" + Date.now(),
      name,
      email,
      role: role || "jobseeker",
      title: role === "employer" ? "Hiring Manager" : "Software Engineer"
    };
    localStorage.setItem("token", "demo-token-" + Date.now());
    localStorage.setItem("techjobs_current_user", JSON.stringify(newUser));
    return { success: true, token: "demo-token", data: newUser };
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const cached = localStorage.getItem("techjobs_current_user");
    if (cached) {
      return { success: true, data: JSON.parse(cached) };
    }
    return { success: false, data: null };
  },

  // Jobs endpoints
  getJobs: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.keyword) queryParams.append("keyword", filters.keyword);
      if (filters.type && filters.type !== "All") queryParams.append("type", filters.type.toLowerCase());
      const res = await fetch(`${API_BASE_URL}/jobs?${queryParams.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return { success: true, data: json.data.map(mapBackendJobToFrontend) };
        }
      }
    } catch {
      // Graceful offline fallback
    }

    let all = getStoredJobs();
    if (filters.keyword) {
      const q = filters.keyword.toLowerCase();
      all = all.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        (j.tags && j.tags.some(t => t.toLowerCase().includes(q))) ||
        (j.category && j.category.toLowerCase().includes(q))
      );
    }
    if (filters.type && filters.type !== "All") {
      all = all.filter(j => j.type.toLowerCase() === filters.type.toLowerCase() || j.workMode.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.category && filters.category !== "All") {
      all = all.filter(j => j.category === filters.category);
    }
    if (filters.workMode && filters.workMode !== "All") {
      all = all.filter(j => j.workMode.toLowerCase() === filters.workMode.toLowerCase());
    }
    return { success: true, data: all };
  },

  getJob: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { success: true, data: mapBackendJobToFrontend(json.data) };
        }
      }
    } catch {
      // Fallback
    }
    const all = getStoredJobs();
    const found = all.find(j => String(j.id) === String(id) || String(j._id) === String(id));
    if (found) return { success: true, data: found };
    return { success: false, message: "Job not found" };
  },

  createJob: async (jobData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(jobData),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const all = getStoredJobs();
    const newJob = {
      id: "job-" + Date.now(),
      title: jobData.title,
      company: jobData.companyName || "Linear",
      companySlug: (jobData.companyName || "linear").toLowerCase().replace(/[^a-z0-9]/g, ""),
      department: "Engineering",
      location: jobData.location,
      workMode: jobData.location.toLowerCase().includes("remote") ? "Remote" : "Hybrid",
      type: jobData.type || "Full-time",
      seniority: "Senior",
      salary: jobData.salaryMin && jobData.salaryMax ? `$${jobData.salaryMin / 1000}k – $${jobData.salaryMax / 1000}k` : "$180k – $220k",
      salaryMin: jobData.salaryMin || 180000,
      salaryMax: jobData.salaryMax || 220000,
      equity: "0.10% – 0.25%",
      tags: Array.isArray(jobData.requirements) ? jobData.requirements : (jobData.requirements || "").split(",").map(s => s.trim()).filter(Boolean),
      category: "Frontend & UI",
      postedAt: "Just now",
      featured: false,
      verified: true,
      summary: jobData.description.slice(0, 160) + "...",
      description: jobData.description,
      responsibilities: ["Lead engineering deliverables.", "Collaborate with core design and systems teams."],
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements : ["4+ years software experience"],
      interviewProcess: [
        { step: "1", title: "Recruiter Intro", duration: "30 min", desc: "Team alignment." },
        { step: "2", title: "System Architecture", duration: "60 min", desc: "Technical evaluation." },
        { step: "3", title: "Final Chat", duration: "45 min", desc: "Offer details." }
      ]
    };
    const updated = [newJob, ...all];
    saveStoredJobs(updated);
    return { success: true, data: newJob };
  },

  // Companies endpoints
  getCompanies: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/companies`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json;
        }
      }
    } catch {
      // Fallback
    }
    return { success: true, data: initialCompanies };
  },

  // Applications endpoints
  applyForJob: async (jobId, applicationData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(applicationData),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const currentApps = getStoredApplications();
    const allJobs = getStoredJobs();
    const job = allJobs.find(j => String(j.id) === String(jobId)) || allJobs[0];
    const newApp = {
      _id: "app-" + Date.now(),
      job,
      applicantName: applicationData.applicantName || "Alex Rivera",
      email: applicationData.email || "alex.rivera@example.com",
      phone: applicationData.phone || "",
      coverLetter: applicationData.coverLetter || "",
      resumeURL: applicationData.resumeURL,
      status: "submitted",
      appliedAt: new Date().toISOString(),
      notes: "Application submitted via direct portal."
    };
    const updated = [newApp, ...currentApps];
    saveStoredApplications(updated);
    return { success: true, data: newApp };
  },

  getApplications: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { success: true, data: getStoredApplications() };
  }
};
