const TYPES = ["All", "Full-time", "Part-time", "Remote"];

export default function FilterBar({ activeFilter, setActiveFilter }) {
  return (
    <div className="filter-bar">
      <span className="filter-label">Type:</span>
      {TYPES.map((type) => (
        <button
          key={type}
          id={`filter-${type.toLowerCase().replace(/\s+/g, "-")}`}
          className={`filter-pill ${activeFilter === type ? "active" : ""}`}
          onClick={() => setActiveFilter(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
