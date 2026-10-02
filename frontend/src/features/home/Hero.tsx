// To swap the photo, replace this import and update the --focus-* values in
// Hero.css to the point (as % of the image) that should stay centered.
import heroImage from "../../assets/hero-building.jpg";
import "./Hero.css";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <img
          className="hero__photo"
          src={heroImage}
          alt="The Westlake Medical & Dental building"
          fetchPriority="high"
        />
      </div>
      <div className="hero__panel">
        <div className="hero__content">
          <span className="hero__eyebrow">Sleep Medicine &amp; Diagnostics</span>
          <h1 className="hero__title">Welcome to the Westlake Sleep Center</h1>
          <p className="hero__subtitle">
            Placeholder subtitle — a short sentence about comprehensive sleep testing and
            compassionate care for better nights and healthier days.
          </p>
        </div>
      </div>
    </section>
  );
}
