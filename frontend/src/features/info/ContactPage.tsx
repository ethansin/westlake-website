import { PageShell } from "../../components/layout/PageShell";
import "../../components/layout/content.css";
import { clinic } from "../../config/clinic";

export function ContactPage() {
  return (
    <PageShell crumbs={[{ label: "Information", to: "/info" }, { label: "Contact" }]} title="Contact">
      <div className="content-stack">
        <section className="content-section glass" aria-label="Contact details">
          <dl className="detail-list">
            <div>
              <dt>Office</dt>
              <dd>
                <a className="text-link" href={clinic.phone.href}>
                  {clinic.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt>Fax</dt>
              <dd>{clinic.fax}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>
                <address className="address">
                  {clinic.address.street}
                  <br />
                  {clinic.address.city}, {clinic.address.state} {clinic.address.zip}
                </address>
                <a className="text-link" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps ↗
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </PageShell>
  );
}
