import { Link } from "react-router-dom";
import type { Access, NavItem, NavSection } from "../../config/navigation";
import { PageShell } from "./PageShell";

const ACCESS_NOTE: Record<Exclude<Access, "public">, string> = {
  patient: "This page will require patient verification.",
  provider: "This page will require a provider account.",
  employee: "This page will require a Westlake staff sign-in.",
};

/** Stand-in for any nav item whose real page hasn't been built yet. */
export function PlaceholderPage({ section, item }: { section: NavSection; item: NavItem }) {
  return (
    <PageShell
      crumbs={[{ label: section.label, to: section.basePath }, { label: item.label }]}
      title={item.label}
      lead={item.description}
    >
      <div className="placeholder-card glass">
        <span className="badge">Coming soon</span>
        <p>This page is a placeholder. Content will be added here.</p>
        {item.access !== "public" && <p className="placeholder-card__note">{ACCESS_NOTE[item.access]}</p>}
        <Link to={section.basePath} className="text-link">
          ← Back to {section.label}
        </Link>
      </div>
    </PageShell>
  );
}
