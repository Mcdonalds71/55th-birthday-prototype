import React from 'react';
import './EventDetails.css';

export default function EventDetails() {
  return (
    <section className="event-details">
      <div className="container">
        <h2 className="event-section-title animate-fade-up">THE EVENT</h2>
        <div className="event-editorial-layout">
          
          <div className="event-item animate-fade-up delay-100">
            <div className="event-label">WHEN</div>
            <div className="event-value">
              <span className="event-highlight">17</span>
              <div className="event-subtext">
                OCTOBER 2026<br/>
                <span className="text-gold">2:00 PM PROMPT</span>
              </div>
            </div>
          </div>

          <div className="event-divider"></div>

          <div className="event-item animate-fade-up delay-200">
            <div className="event-label">WHERE</div>
            <div className="event-value location">
              <span className="event-highlight">HOUSE ON THE ROCK</span>
              <div className="event-subtext">
                CHURCH AUDITORIUM<br/>
                ASABA, DELTA STATE
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
