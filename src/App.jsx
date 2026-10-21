import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import CompaniesPage from "./pages/CompaniesPage";
import SalariesPage from "./pages/SalariesPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { api } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.getCurrentUser();
        if (res.success && res.data) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Session restore err:", err);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--bg-base)" }}>
        <div style={{ width: 24, height: 24, border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#ffffff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar user={user} setUser={setUser} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage user={user} />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/salaries" element={<SalariesPage />} />
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Minimalist Editorial Footer */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "3rem 1.75rem 2.5rem", marginTop: "auto", background: "var(--bg-base)" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.95rem" }}>
                <span>INDEX</span>
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>// TECH JOBS</span>
              </div>
              <p style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Curated high-signal technical opportunities. No recruiter spam.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Jobs Feed</Link>
              <Link to="/companies" style={{ color: "inherit", textDecoration: "none" }}>Curated Companies</Link>
              <Link to="/salaries" style={{ color: "inherit", textDecoration: "none" }}>Compensation Benchmark</Link>
              <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>Candidate Workspace</Link>
            </div>
          </div>
          <div style={{ maxWidth: 1040, margin: "1.75rem auto 0", borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.72rem", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
            <span>&copy; {new Date().getFullYear()} INDEX TECHNICAL DIRECTORY</span>
            <span>REAL-TIME STATUS: VERIFIED</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
