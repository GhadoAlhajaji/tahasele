import { Link } from "react-router-dom";
import { school } from "../config/app";

export default function SchoolHeader({ compact = false }) {
  return (
    <header className={`school-header ${compact ? "is-compact" : ""}`}>
      <Link to="/" className="school-brand">
        <span className="school-logo">
          <img src={school.logoSrc} alt="" />
        </span>
        <span className="school-text">
          <span className="school-name">{school.name}</span>
          <span className="school-authority">{school.authority}</span>
        </span>
      </Link>
    </header>
  );
}
