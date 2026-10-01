import { useRef, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import type { NavSection } from "../../config/navigation";
import { NavItemLink } from "./NavItemLink";

interface Props {
  section: NavSection;
  isOpen: boolean;
  isActive: boolean;
  onOpen: (id: string) => void;
  onClose: (id: string) => void;
  onToggle: (id: string) => void;
}

/** Grace period so the menu doesn't snap shut when the pointer briefly leaves it. */
const CLOSE_DELAY_MS = 140;

export function NavDropdown({ section, isOpen, isActive, onOpen, onClose, onToggle }: Props) {
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `nav-panel-${section.id}`;

  // Hover only applies to real mice; touch taps go through onClick instead.
  const handlePointerEnter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    onOpen(section.id);
  };

  const handlePointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => onClose(section.id), CLOSE_DELAY_MS);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      onClose(section.id);
      triggerRef.current?.focus();
    }
  };

  // Close when keyboard focus moves outside this dropdown.
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      onClose(section.id);
    }
  };

  // A mouse click lands after hover already opened the menu, so it shouldn't
  // toggle it shut. Touch and keyboard (Enter/Space) clicks do toggle.
  const lastPointerType = useRef<string | null>(null);
  const handleClick = () => {
    if (lastPointerType.current === "mouse") onOpen(section.id);
    else onToggle(section.id);
    lastPointerType.current = null;
  };

  const close = () => onClose(section.id);

  return (
    <div
      className="nav-dropdown"
      data-open={isOpen}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`nav-dropdown__trigger${isActive ? " is-active" : ""}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onPointerDown={(e) => (lastPointerType.current = e.pointerType)}
        onClick={handleClick}
      >
        {section.label}
        <svg className="nav-dropdown__chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div id={panelId} className="nav-dropdown__panel glass">
        <div className="nav-dropdown__header">
          <span>{section.label}</span>
          <Link to={section.basePath} onClick={close} className="nav-dropdown__overview">
            Overview →
          </Link>
        </div>
        <ul className="nav-dropdown__list">
          {section.items.map((item) => (
            <li key={item.path}>
              <NavItemLink item={item} onNavigate={close} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
