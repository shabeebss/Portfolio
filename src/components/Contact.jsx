import React, { useState } from 'react';
import { Mail, Copy, Send, FileDown, Phone, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { useToast } from '../context/ToastContext';

export const Contact = () => {
  const { addToast, copyToClipboard } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      addToast('Message sent successfully! Thank you for reaching out.', 'success');

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // Confetti fallback
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setIsSuccess(false), 6000);
    }, 1000);
  };

  const handleCopyEmail = () => {
    copyToClipboard(PORTFOLIO_CONFIG.email, 'Email');
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.85 }
      });
    } catch (err) {}
  };

  const handleDownloadCV = () => {
    addToast('Downloading Curriculum Vitae...', 'success');
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.85 }
      });
    } catch (err) {}
  };

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">Direct Communication</span>
          <h2 className="section-title">Let's Build Together</h2>
          <p className="section-description">
            Looking for a Full Stack Python / Django & Next.js systems engineer for your team or product? Reach out directly across any channel below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Channels List */}
          <div className="contact-info reveal-left">
            <h3>Direct Channels</h3>
            <p>Click any card to trigger instant action (Compose Email, WhatsApp chat, Phone dialer, or CV Download):</p>

            <div className="contact-cards-list">
              {/* 1. Compose Email */}
              <div className="contact-action-card spotlight-card">
                <a href={PORTFOLIO_CONFIG.mailtoUrl} className="contact-card-left" style={{ textDecoration: 'none', flex: 1 }}>
                  <div className="contact-card-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-card-text">
                    <span>Compose Email</span>
                    <p>{PORTFOLIO_CONFIG.email}</p>
                  </div>
                </a>
                <button
                  type="button"
                  className="contact-card-action-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                >
                  <Copy size={13} />
                  Copy
                </button>
              </div>

              {/* 2. WhatsApp Direct */}
              <a
                href={PORTFOLIO_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action-card spotlight-card"
                style={{ textDecoration: 'none' }}
              >
                <div className="contact-card-left">
                  <div className="contact-card-icon whatsapp-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
                      <path d="M12.031 0C5.408 0 0.031 5.377 0.031 12c0 2.115.553 4.184 1.605 6.007L0 24l6.177-1.62c1.76 0.96 3.753 1.467 5.854 1.467 6.624 0 12-5.377 12-12s-5.376-12-11.969-12zm0 21.808c-1.838 0-3.639-.494-5.207-1.428l-.374-.222-3.869 1.015 1.033-3.771-.244-.388A9.774 9.774 0 012.23 12c0-5.405 4.396-9.808 9.801-9.808 5.405 0 9.801 4.403 9.801 9.808 0 5.405-4.396 9.808-9.801 9.808zm5.374-7.348c-.295-.148-1.745-.861-2.015-.96-.27-.098-.466-.148-.663.148-.197.295-.762.96-.934 1.157-.172.197-.344.222-.639.074s-1.248-.46-2.378-1.468c-.879-.784-1.473-1.753-1.645-2.048-.172-.295-.018-.455.13-.602.133-.133.295-.344.443-.516.148-.172.197-.295.295-.492.098-.197.049-.369-.025-.516-.074-.148-.663-1.599-.909-2.191-.239-.577-.482-.499-.663-.508l-.565-.01c-.197 0-.516.074-.786.369s-1.033 1.009-1.033 2.461c0 1.452 1.057 2.855 1.205 3.052.148.197 2.08 3.176 5.039 4.455.704.305 1.254.487 1.683.623.708.225 1.352.193 1.862.117.568-.085 1.745-.714 1.991-1.403.246-.689.246-1.279.172-1.403-.074-.124-.27-.197-.565-.345z"/>
                    </svg>
                  </div>
                  <div className="contact-card-text">
                    <span>WhatsApp Messenger</span>
                    <p>Instant Direct Communication</p>
                  </div>
                </div>
                <span className="contact-card-action-btn" style={{ color: '#25d366', borderColor: 'rgba(37, 211, 102, 0.3)' }}>
                  <Send size={13} />
                  Chat Now
                </span>
              </a>

              {/* 3. Download Resume */}
              <a
                href={PORTFOLIO_CONFIG.resumePath}
                download="Shabeeb_Resume.pdf"
                className="contact-action-card spotlight-card"
                style={{ textDecoration: 'none' }}
                onClick={handleDownloadCV}
              >
                <div className="contact-card-left">
                  <div className="contact-card-icon">
                    <FileDown size={20} />
                  </div>
                  <div className="contact-card-text">
                    <span>Download Curriculum Vitae</span>
                    <p>Shabeeb_Resume.pdf (PDF Document)</p>
                  </div>
                </div>
                <span className="contact-card-action-btn">
                  <FileDown size={13} />
                  Download
                </span>
              </a>

              {/* 4. Phone Direct */}
              <div className="contact-action-card spotlight-card">
                <a href={PORTFOLIO_CONFIG.telUrl} className="contact-card-left" style={{ textDecoration: 'none', flex: 1 }}>
                  <div className="contact-card-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-card-text">
                    <span>Phone Call</span>
                    <p>{PORTFOLIO_CONFIG.phone}</p>
                  </div>
                </a>
                <button
                  type="button"
                  className="contact-card-action-btn"
                  onClick={() => copyToClipboard(PORTFOLIO_CONFIG.phone, 'Phone Number')}
                  title="Copy phone number to clipboard"
                >
                  <Copy size={13} />
                  Copy
                </button>
              </div>

              {/* 5. Location */}
              <div className="contact-action-card spotlight-card">
                <div className="contact-card-left">
                  <div className="contact-card-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-card-text">
                    <span>Location</span>
                    <p>{PORTFOLIO_CONFIG.location}</p>
                  </div>
                </div>
                <span className="skill-tag" style={{ fontSize: '0.74rem' }}>India (IST)</span>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="contact-form-wrapper reveal-right">
            <h3>Send a Message</h3>
            <p>Have an inquiry or opportunity? Drop a note directly:</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="e.g. Full Stack Engineering Role"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Hi Shabeeb, I came across your portfolio and would like to connect regarding..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : isSuccess ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
