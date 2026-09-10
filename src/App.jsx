import React, { useState } from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Books from './components/Books';
import TicketingModal from './components/TicketingModal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-container">
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <EventDetails />
      <Books />
      
      <footer style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#1A110D', color: '#E2DCD0' }}>
        <p>© 2026 Rev. Barr. Cosfinney Udoka. All Rights Reserved.</p>
      </footer>

      <TicketingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
