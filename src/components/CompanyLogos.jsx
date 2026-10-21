// Clean, pixel-perfect brand marks for tech companies in modern light aesthetic

export function CompanyLogo({ name = "", slug = "", size = 36, className = "" }) {
  const normalized = (slug || name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // Brand-specific SVG paths
  if (normalized.includes("stripe")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#635BFF",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 3px rgba(99, 91, 255, 0.2)"
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path
            d="M13.9 10.1c0-.9-.7-1.4-1.9-1.4-1.7 0-3.8.7-5.5 1.7V5.5c1.9-.8 3.9-1.2 5.8-1.2 4.4 0 7.3 2.2 7.3 6.1 0 5.9-8.1 6.2-8.1 9.4 0 1.1.9 1.6 2.3 1.6 2 0 4.4-.9 6.2-2v4.8c-2.1.9-4.3 1.4-6.5 1.4-4.6 0-7.7-2.3-7.7-6.2 0-6.1 8.1-6.4 8.1-9.3z"
            fill="#ffffff"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes("linear")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#5E6AD2",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 3px rgba(94, 106, 210, 0.2)"
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path
            d="M3.2 12.8L11.2 4.8C11.6 4.4 12.4 4.4 12.8 4.8L20.8 12.8C21.2 13.2 21.2 14 20.8 14.4L12.8 22.4C12.4 22.8 11.6 22.8 11.2 22.4L3.2 14.4C2.8 14 2.8 13.2 3.2 12.8Z"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M7 12L12 7L17 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("vercel")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#0f172a",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.15)"
        }}
      >
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <path d="M12 3L22 20.5H2L12 3Z" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("anthropic")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#292524",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 3px rgba(41, 37, 36, 0.15)"
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15 8.5L22 10L17 15L18.5 22L12 18.5L5.5 22L7 15L2 10L9 8.5L12 2Z" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("supabase")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#13211c",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 3px rgba(19, 33, 28, 0.15)"
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path
            d="M13.2 2.5L3.8 14.1C3.3 14.7 3.8 15.6 4.6 15.6H11V21.5C11 22.3 12.1 22.7 12.6 22.1L21.8 10.7C22.3 10.1 21.8 9.2 21 9.2H14.8L15.3 2.9C15.4 2.2 14.5 1.7 13.9 2.2L13.2 2.5Z"
            fill="#3ECF8E"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes("figma")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M8 2H12V8H8C6.34 8 5 6.66 5 5C5 3.34 6.34 2 8 2Z" fill="#F24E1E" />
          <path d="M12 2H16C17.66 2 19 3.34 19 5C19 6.66 17.66 8 16 8H12V2Z" fill="#FF7262" />
          <path d="M8 8H12V14H8C6.34 14 5 12.66 5 11C5 9.34 6.34 8 8 8Z" fill="#A259FF" />
          <path d="M12 8H16C17.66 8 19 9.34 19 11C19 12.66 17.66 14 16 14C14.34 14 13 12.66 13 11V8H12Z" fill="#1ABCFE" />
          <path d="M8 14H12V17C12 18.66 10.66 20 9 20C7.34 20 6 18.66 6 17C6 15.34 7.34 14 8 14Z" fill="#0ACF83" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("notion")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
        }}
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
          <path
            d="M4.5 4.5L16.2 3.7C17.6 3.6 18.4 4.5 18.4 5.8V17.7C18.4 19.3 17.2 20.3 15.6 20.4L5.2 21C4 21.1 3.4 20.4 3.4 19.3V6.2C3.4 5.1 3.9 4.5 4.5 4.5Z"
            fill="#000000"
          />
          <path d="M8 7.5V17L14.5 9.5V16.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("retool")) {
    return (
      <div
        className={`company-logo-badge ${className}`}
        style={{
          width: size,
          height: size,
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: Math.max(6, Math.floor(size * 0.22)),
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="8" height="7" rx="1.5" fill="#3B82F6" />
          <rect x="13" y="4" width="8" height="7" rx="1.5" fill="#60A5FA" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" fill="#2563EB" />
        </svg>
      </div>
    );
  }

  // Generic fallback with clean typographic monogram
  const initials = (name || "Tech").slice(0, 2).toUpperCase();
  return (
    <div
      className={`company-logo-badge ${className}`}
      style={{
        width: size,
        height: size,
        background: "#f1f5f9",
        border: "1px solid #cbd5e1",
        borderRadius: Math.max(6, Math.floor(size * 0.22)),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: Math.max(11, Math.floor(size * 0.38)),
        letterSpacing: "0.02em",
        color: "#1e293b"
      }}
    >
      {initials}
    </div>
  );
}
