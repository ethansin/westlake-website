// To swap in a real photo, drop it in src/assets and change this import.
import heroImage from "../../assets/hero-placeholder.svg";
import "./Hero.css";

export function Hero() {
  return (
    <section className="hero">
      <div
        className="hero__media"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Calm night sky over rolling hills"
      />
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
