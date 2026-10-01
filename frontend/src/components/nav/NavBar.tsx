import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { navSections } from "../../config/navigation";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";
import "./NavBar.css";

export function NavBar() {
  const { pathname } = useLocation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = (id: string) => setOpenId(id);
  // Only close if this section is still the open one — another may have opened meanwhile.
  const close = (id: string) => setOpenId((cur) => (cur === id ? null : cur));
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <header className={`navbar${scrolled ? " is-scrolled" : ""}`}>
      <div className="navbar__glass" aria-hidden="true" />
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="" className="navbar__logo" />
          <span className="navbar__wordmark">
            Westlake <span>Sleep Center</span>
          </span>
        </Link>

        <nav className="navbar__links" aria-label="Main">
          {navSections.map((section) => (
            <NavDropdown
              key={section.id}
              section={section}
              isOpen={openId === section.id}
              isActive={pathname.startsWith(section.basePath)}
              onOpen={open}
              onClose={close}
              onToggle={toggle}
            />
          ))}
        </nav>

        <button
          type="button"
          className="navbar__menu-btn"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="visually-hidden">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <span className="navbar__menu-icon" data-open={mobileOpen} aria-hidden="true" />
        </button>
      </div>

      {mobileOpen && <MobileMenu onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}
