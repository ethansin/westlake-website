import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./pages.css";

interface Crumb {
  label: string;
  to?: string;
}

/** Standard interior-page frame: soft background, breadcrumb, title. */
export function PageShell({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-shell">
      <div className="page-shell__inner">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span aria-hidden="true"> / </span>
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="page-shell__title">{title}</h1>
        {lead && <p className="page-shell__lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
