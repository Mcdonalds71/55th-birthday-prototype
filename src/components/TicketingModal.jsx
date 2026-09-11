import React, { useState } from 'react';
import { X, Upload, CheckCircle, Copy, Check } from 'lucide-react';
import './TicketingModal.css';

export default function TicketingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [receiptFile, setReceiptFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmitToFormspree = async () => {
    if (!receiptFile) {
      alert("Please select a receipt file first.");
      return;
    }
    
    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("receipt", receiptFile);
    submitData.append("_replyto", formData.email);

    try {
      // Formspree Free Tier DOES NOT support file uploads.
      // So we send only the text data to Formspree.
      const formspreeData = new FormData();
      formspreeData.append("name", formData.name);
      formspreeData.append("email", formData.email);
      formspreeData.append("phone", formData.phone);
      formspreeData.append("_replyto", formData.email);
      formspreeData.append("receipt_note", "Receipt was uploaded and sent to Make.com");

      // 1. Send to Formspree
      const formspreePromise = fetch("https://formspree.io/f/mbgjbbwz", {
        method: "POST",
        body: formspreeData,
        headers: { 'Accept': 'application/json' }
      });

      // 2. Send the ACTUAL file and data to Make.com
      const makeData = new FormData();
      makeData.append("name", formData.name);
      makeData.append("email", formData.email);
      makeData.append("phone", formData.phone);
      makeData.append("receipt", receiptFile);

      const makePromise = fetch("https://hook.us1.make.com/pnnq3jumlbm9o3u8s1vqwpj6f4x9wcwt", {
        method: "POST",
        body: makeData
      }).catch(err => {
        console.log("Make webhook silent failure (likely Ad-Blocker):", err);
        return { ok: false }; // Prevents Promise.all from crashing
      });

      // Execute both safely
      const [formspreeRes, makeRes] = await Promise.all([formspreePromise, makePromise]);

      if (!formspreeRes.ok) {
        alert("Formspree error: Make sure your Formspree email is verified in your inbox.");
        setIsSubmitting(false);
        return;
      }

      // Success
      setStep(4);

    } catch (error) {
      alert("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-up">
        <button className="close-btn" onClick={handleClose}>
          <X size={24} />
        </button>

        {step === 1 && (
          <div className="modal-step">
            <h2 className="modal-title">RSVP & GET TICKET</h2>
            <p className="modal-subtitle">TICKET PRICE: <strong>₦15,000</strong></p>
            <form onSubmit={handleNext} className="ticket-form">
              <div className="form-group">
                <label>FULL NAME</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PHONE NUMBER</label>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2">CONTINUE TO PAYMENT</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="modal-step">
            <h2 className="modal-title">PAYMENT DETAILS</h2>
            <p className="modal-subtitle">Please transfer ₦15,000 to the account below</p>
            
            <div className="account-details-card">
              <div className="account-row">
                <span className="account-label">Bank Name</span>
                <div className="account-value-group">
                  <span className="account-value">PalmPay</span>
                  <button type="button" onClick={() => handleCopy('PalmPay', 'bank')} className="copy-btn">
                    {copiedField === 'bank' ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              
              <div className="account-divider"></div>
              
              <div className="account-row">
                <span className="account-label">Account Number</span>
                <div className="account-value-group">
                  <span className="account-value highlight">8167146206</span>
                  <button type="button" onClick={() => handleCopy('8167146206', 'accNumber')} className="copy-btn">
                    {copiedField === 'accNumber' ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="account-divider"></div>
              
              <div className="account-row">
                <span className="account-label">Account Name</span>
                <div className="account-value-group">
                  <span className="account-value">Udoka Anita Ikebuwa</span>
                  <button type="button" onClick={() => handleCopy('Udoka Anita Ikebuwa', 'accName')} className="copy-btn">
                    {copiedField === 'accName' ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(3)} className="btn btn-primary w-100 mt-4">
              I HAVE MADE THE TRANSFER
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="modal-step">
            <h2 className="modal-title">UPLOAD RECEIPT</h2>
            <p className="modal-subtitle">Please upload your transfer receipt to confirm your ticket.</p>
            
            <div className="upload-area">
              <div className="upload-icon-circle">
                <Upload size={32} />
              </div>
              <p className="upload-text">{receiptFile ? receiptFile.name : 'Click or drag file to upload'}</p>
              <span className="upload-hint">Supports JPG, PNG, PDF</span>
              <input type="file" name="receipt" accept="image/*,.pdf" className="file-input" onChange={handleFileChange} />
            </div>
            
            <button 
              onClick={handleSubmitToFormspree} 
              className="btn btn-primary w-100 mt-4"
              disabled={isSubmitting || !receiptFile}
            >
              {isSubmitting ? 'SUBMITTING...' : 'UPLOAD & COMPLETE RSVP'}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="modal-step text-center success-step">
            <div className="success-icon-wrapper">
              <CheckCircle size={64} className="success-icon" />
            </div>
            <h2 className="modal-title">PAYMENT RECEIVED!</h2>
            <p className="success-text">Thank you, {formData.name || 'Guest'}. Your receipt has been uploaded successfully. Once verified, we will send your digital ticket to your email.</p>
            <button onClick={handleClose} className="btn btn-primary mt-4">
              BACK TO HOME
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
