import React, { useEffect, useRef } from 'react';
import './Books.css';

export default function Books() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section className="books-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header text-center animate-on-scroll">
          <h2 className="section-title">THE RELEASES</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="books-showcase">
          <div className="book-showcase-item animate-on-scroll delay-100">
            <div className="book-image-container">
              <img src="/book_tendencies.jpg" alt="Tendencies Book" className="book-cover-img" />
            </div>
            <div className="book-details">
              <h3 className="book-title">TENDENCIES</h3>
              <p className="book-desc">An exploration of human nature, faith, and the paths we choose.</p>
            </div>
          </div>

          <div className="book-showcase-item animate-on-scroll delay-300">
            <div className="book-details desktop-only text-right">
              <h3 className="book-title">BEFORE YOU JAPA</h3>
              <p className="book-desc">Essential wisdom and practical guidance for those considering migration.</p>
            </div>
            <div className="book-image-container">
              <img src="/book_japa.jpg" alt="Before You Japa Book" className="book-cover-img" />
            </div>
            <div className="book-details mobile-only">
              <h3 className="book-title">BEFORE YOU JAPA</h3>
              <p className="book-desc">Essential wisdom and practical guidance for those considering migration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
