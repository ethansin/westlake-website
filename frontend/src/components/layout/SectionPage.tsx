import type { NavSection } from "../../config/navigation";
import { NavItemLink } from "../nav/NavItemLink";
import { PageShell } from "./PageShell";

/** Overview page for a nav section (e.g. /patients) listing all its pages. */
export function SectionPage({ section }: { section: NavSection }) {
  return (
    <PageShell crumbs={[{ label: section.label }]} title={section.label} lead={section.summary}>
      <ul className="card-grid">
        {section.items.map((item) => (
          <li key={item.path} className="glass card">
            <NavItemLink item={item} />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
