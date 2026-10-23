import { PageShell } from "../../components/layout/PageShell";
import "../../components/layout/content.css";
import { clinic } from "../../config/clinic";

const VIDEO_ID = "KjESe0QLnJk";
const VIDEO_TITLE = "How to use SleepView – Patient Instructions";

const steps = [
  { title: "Pick up your device", body: "Come to our office at your appointment time to pick up a portable sleep test device." },
  { title: "Sleep at home", body: "Use the device at home while you sleep, for one night." },
  { title: "Return it the next day", body: "Bring the device back to our office the following day." },
];

const suiteDirections = [
  "Enter through the side entrance, on the right side of the building corner.",
  "Take the elevator to the 2nd floor.",
  "Exit the elevator, turn left, then turn left again.",
  "Walk to the end of the hall. Suite 250 is on the left.",
  "Please ring the doorbell.",
];

export function HomeSleepStudyPage() {
  return (
    <PageShell
      crumbs={[{ label: "Patients", to: "/patients" }, { label: "Preparing for Your Home Sleep Study" }]}
      title="Preparing for Your Home Sleep Study"
      lead="Your doctor has referred you for a home sleep test. Here's what to expect and how to get ready for your appointment."
    >
      <div className="content-stack">
        <section aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="section-heading">
            How it works
          </h2>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title} className="steps__item glass">
                <span className="steps__number" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="content-section glass" aria-labelledby="video">
          <span className="eyebrow">Before your appointment</span>
          <h2 id="video">Watch the instruction video</h2>
          <p>
            Please watch <strong>“{VIDEO_TITLE}”</strong> before you come in. It shows you how to use the home
            sleep test device.
          </p>
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
              title={VIDEO_TITLE}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <a
            className="text-link"
            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube ↗
          </a>
          <div className="callout">
            <strong>Need captions in another language?</strong> Turn on closed captions (CC), then open{" "}
            <em>Settings → Subtitles/CC</em>. English and Spanish are available, and <em>Auto-translate</em> offers
            Chinese and many other languages.
          </div>
        </section>

        <section className="content-section glass" aria-labelledby="bring">
          <h2 id="bring">What to bring</h2>
          <ul className="checklist">
            <li>
              <CheckIcon />
              <span>
                <strong>Photo ID</strong>
              </span>
            </li>
            <li>
              <CheckIcon />
              <span>
                <strong>Insurance card</strong>, such as San Francisco Health Plan, Medi-Cal, or Medicare. Our staff
                will make a copy.
              </span>
            </li>
          </ul>
        </section>

        <section className="content-section glass" aria-labelledby="getting-here">
          <h2 id="getting-here">Getting here</h2>
          <div className="split">
            <div>
              <address className="address">
                <strong>{clinic.name}</strong>
                {clinic.address.street}
                <br />
                {clinic.address.city}, {clinic.address.state} {clinic.address.zip}
              </address>
              <p>
                Office: <a className="text-link" href={clinic.phone.href}>{clinic.phone.display}</a>
              </p>
              <p className="muted">
                We're inside the Westlake Shopping Center, in the Medical &amp; Dental Building (Building 341), next
                to T‑Mobile, Mattress Firm, and Ross. The cross streets are Park Plaza Drive and John Daly Boulevard.
              </p>
              <a className="text-link" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps ↗
              </a>
            </div>
            <div>
              <h3>Finding our suite</h3>
              <ol className="numbered-list">
                {suiteDirections.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <p className="content-footnote">
          Questions about your appointment? Call us at{" "}
          <a className="text-link" href={clinic.phone.href}>
            {clinic.phone.display}
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}

function CheckIcon() {
  return (
    <svg className="checklist__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.2 8.8 12.5 13.5 7.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
