import React from 'react';
import './Hero.css';

export default function Hero({ onOpenModal }) {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text">
          <div className="date-badge animate-fade-up">OCTOBER 15TH, 2026</div>
          <h1 className="animate-fade-up" style={{animationDelay: '0.1s'}}>
            Celebrating <br/>
            <span className="highlight">55<sup className="th-sup">TH</sup></span><br/>
            Years of Grace
          </h1>
          <p className="subtitle animate-fade-up" style={{animationDelay: '0.2s'}}>
            Join us for the 55th Birthday Celebration & Double Book Launch of <br/>
            <strong>Rev. Barr. Cosfinney Udoka N.</strong>
          </p>
          <div className="hero-actions animate-fade-up" style={{animationDelay: '0.3s'}}>
            <button className="btn btn-luxury" onClick={onOpenModal}>
              RSVP & GET TICKET
            </button>
            <a href="#books" className="btn btn-outline-light">
              Explore Books
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
