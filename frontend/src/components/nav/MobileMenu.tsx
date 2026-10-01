import { useState } from "react";
import { navSections } from "../../config/navigation";
import { NavItemLink } from "./NavItemLink";

/** Accordion menu shown below the nav bar on narrow screens. */
export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div id="mobile-menu" className="mobile-menu glass">
      {navSections.map((section) => {
        const expanded = expandedId === section.id;
        return (
          <div key={section.id} className="mobile-menu__section">
            <button
              type="button"
              className="mobile-menu__trigger"
              aria-expanded={expanded}
              onClick={() => setExpandedId(expanded ? null : section.id)}
            >
              {section.label}
              <svg className="nav-dropdown__chevron" width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {expanded && (
              <ul className="mobile-menu__list">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavItemLink item={item} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
