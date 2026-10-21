import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IconBookmark, IconUser, IconBriefcase } from "./Icons";
import { getSavedJobIds } from "../api";

export default function Navbar({ user, setUser }) {
  const [savedCount, setSavedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = () => {
      setSavedCount(getSavedJobIds().length);
    };
    updateCount();
    window.addEventListener("storage", updateCount);
    // Custom event to sync across components
    window.addEventListener("bookmarksUpdated", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("bookmarksUpdated", updateCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("techjobs_current_user");
    setUser(null);
    navigate("/");
  };

  const navClass = ({ isActive }) => (isActive ? "nav-item-link active" : "nav-item-link");

  return (
    <header className="site-navbar">
      {/* Brand */}
      <Link to="/" className="brand-wrap">
        <div className="brand-mark">
          <IconBriefcase size={16} />
        </div>
        <div className="brand-text">
          <span>TechJobs</span>
          <span
            style={{
              fontSize: "0.7rem",
              background: "var(--accent-primary-subtle)",
              color: "var(--accent-primary)",
              padding: "0.15rem 0.45rem",
              borderRadius: "4px",
              fontWeight: 700,
              marginLeft: "4px",
              letterSpacing: "0.02em"
            }}
          >
            VERIFIED
          </span>
        </div>
      </Link>

      {/* Main Navigation */}
      <nav>
        <ul className="nav-menu">
          <li>
            <NavLink to="/" className={navClass} end>
              Find Jobs
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies" className={navClass}>
              Top Companies
            </NavLink>
          </li>
          <li>
            <NavLink to="/salaries" className={navClass}>
              Salary Guide
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={navClass}>
              {user ? "Workspace" : "My Applications"}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Actions */}
      <div className="nav-actions">
        <Link
          to="/dashboard"
          className="btn-ghost"
          style={{
            position: "relative",
            padding: "0.45rem 0.75rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem"
          }}
          title="Saved Roles"
        >
          <IconBookmark size={16} />
          <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Saved</span>
          {savedCount > 0 && (
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                background: "var(--accent-amber)",
                color: "#ffffff",
                fontWeight: 700,
                padding: "0.05rem 0.4rem",
                borderRadius: "999px",
                marginLeft: 2
              }}
            >
              {savedCount}
            </span>
          )}
        </Link>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              to="/dashboard"
              className="btn-secondary"
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.85rem" }}
            >
              <IconUser size={14} />
              <span>{user.name.split(" ")[0]}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn-ghost"
              style={{ fontSize: "0.85rem", padding: "0.4rem 0.75rem" }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Link to="/login" className="btn-ghost" style={{ fontSize: "0.875rem" }}>
              Sign in
            </Link>
            <Link to="/register" className="btn-primary" style={{ fontSize: "0.875rem" }}>
              Post a Job
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
