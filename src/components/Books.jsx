import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Books.css';

// Set up PDF worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const BOOKS = [
  {
    title: "Tendencies",
    pdfFile: "/tendencies.pdf",
    description: "We all have things we're inclined to do out of love & they have their results. Explore the deep inclinations of the human spirit."
  },
  {
    title: "Before You Japa",
    pdfFile: "/before-you-japa.pdf",
    description: "A crucial guide for anyone considering relocation. What you must know before you take the leap."
  }
];

export default function Books() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BOOKS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % BOOKS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + BOOKS.length) % BOOKS.length);

  return (
    <section id="books" className="books-section">
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-tag animate-fade-up">DOUBLE LAUNCH</span>
          <h2 className="animate-fade-up">The New Books</h2>
          <div className="title-divider animate-fade-up"></div>
        </div>

        <div className="slideshow-container animate-fade-up">
          <button className="slider-btn prev" onClick={prevSlide}>
            <ChevronLeft size={32} />
          </button>

          <div className="slideshow-content">
            <div className="book-cover-container">
              <Document file={BOOKS[currentIndex].pdfFile}>
                <Page 
                  pageNumber={1} 
                  width={300} 
                  renderTextLayer={false} 
                  renderAnnotationLayer={false} 
                  className="pdf-page-render"
                />
              </Document>
            </div>
            
            <div className="book-info">
              <h3>{BOOKS[currentIndex].title}</h3>
              <p>{BOOKS[currentIndex].description}</p>
            </div>
          </div>

          <button className="slider-btn next" onClick={nextSlide}>
            <ChevronRight size={32} />
          </button>
        </div>
        
        <div className="slideshow-dots">
          {BOOKS.map((_, idx) => (
            <div 
              key={idx} 
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
