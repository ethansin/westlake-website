import { Link } from "react-router-dom";
import type { NavItem } from "../../config/navigation";

/** A single dropdown / mobile-menu entry. Handles internal vs. external links. */
export function NavItemLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const body = (
    <>
      <span className="nav-item__label">
        {item.label}
        {item.access !== "public" && <LockIcon />}
      </span>
      {item.description && <span className="nav-item__desc">{item.description}</span>}
    </>
  );

  if (item.external) {
    return (
      <a className="nav-item" href={item.path} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
        {body}
      </a>
    );
  }

  return (
    <Link className="nav-item" to={item.path} onClick={onNavigate}>
      {body}
    </Link>
  );
}

function LockIcon() {
  return (
    <svg className="nav-item__lock" width="12" height="12" viewBox="0 0 16 16" role="img" aria-label="Sign-in required">
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
