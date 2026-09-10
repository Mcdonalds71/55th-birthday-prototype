import React from 'react';
import './Hero.css';

export default function Hero({ onOpenModal }) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-bg-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-text animate-fade-up">
          <p className="hero-subtitle">CELEB RATING & BOOK LAUNCH</p>
          
          <h1 className="hero-title">
            <div className="number-container">
              <span className="number text-red">55</span>
              <span className="suffix">TH</span>
            </div>
            <span className="birthday text-gold">BIRTHDAY</span>
          </h1>
          
          <p className="hero-description">
            A life of grace, service, and legacy. Join us in honour of 
            <strong className="text-gold"> Rev. Barr. Cosfinney Udoka</strong> as we celebrate 55 years of God's faithfulness and the launch of his new books.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-luxury" onClick={onOpenModal}>
              <span className="btn-text">RSVP & GET TICKET</span>
              <span className="btn-price">(₦15,000)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
