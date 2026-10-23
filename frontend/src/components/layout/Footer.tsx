import { Link } from "react-router-dom";
import { clinic } from "../../config/clinic";
import { policies, policyPath } from "../../config/policies";
import "./Footer.css";

/**
 * Site-wide footer. Carriers' SMS (A2P 10DLC) guidelines ask for a privacy
 * policy link on every page, so every published policy is linked here.
 */
export function Footer() {
  const published = policies.filter((p) => p.content);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__clinic">
          <span className="footer__name">{clinic.name}</span>
          <address>
            {clinic.address.street}, {clinic.address.city}, {clinic.address.state} {clinic.address.zip}
          </address>
          <span>
            Office <a href={clinic.phone.href}>{clinic.phone.display}</a>
            <span aria-hidden="true"> · </span>
            Fax {clinic.fax}
          </span>
        </div>

        <nav className="footer__links" aria-label="Legal and contact">
          {published.map((p) => (
            <Link key={p.slug} to={policyPath(p.slug)}>
              {p.title}
            </Link>
          ))}
          <Link to="/info/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer__inner footer__legal">
        © {new Date().getFullYear()} {clinic.name}
      </div>
    </footer>
  );
}
