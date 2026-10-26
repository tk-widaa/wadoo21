import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { Mail, Send, AlertCircle, CheckCircle, Phone, Code2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { lang } = useLang();
  const t = content[lang].contact;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      return;
    }
    // ⚠️ Frontend-only demo — no real backend/email service connected
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title" id="contact-title">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        <div className="contact__grid">
          {/* Info side */}
          <div className="contact__info">

            {/* Direct contact cards */}
            <div className="contact__direct">
              <a
                href={`mailto:${t.email}`}
                className="contact__direct-card"
                aria-label={t.email_btn}
              >
                <div className="contact__direct-icon">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div className="contact__direct-text">
                  <span className="contact__direct-label">{t.email_btn}</span>
                  <span className="contact__direct-value">{t.email}</span>
                </div>
              </a>

              <a
                href={`tel:${t.phone}`}
                className="contact__direct-card"
                aria-label={t.phone_label}
              >
                <div className="contact__direct-icon">
                  <Phone size={20} aria-hidden="true" />
                </div>
                <div className="contact__direct-text">
                  <span className="contact__direct-label">{t.phone_label}</span>
                  <span className="contact__direct-value" dir="ltr">{t.phone}</span>
                </div>
              </a>
            </div>

            <div className="contact__socials">
              <p className="contact__socials-title">{t.social_title}</p>
              <div className="contact__social-links">
              </div>
            </div>

            {/* Demo notice */}
            <div className="contact__note" role="note">
              <AlertCircle size={15} aria-hidden="true" />
              <p>{t.form_note}</p>
            </div>
          </div>


          {/* Form side */}
          <div className="card contact__form-card">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label={lang === 'ar' ? 'نموذج التواصل' : 'Contact form'}
            >
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  {t.form_name} <span className="required-star" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={lang === 'ar' ? 'وداعه الطاهر' : 'Widaa Mohammed'}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  {t.form_email} <span className="required-star" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="widaa@example.com"
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  {t.form_message} <span className="required-star" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-input form-textarea"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  rows={5}
                  required
                  aria-required="true"
                />
              </div>

              {status === 'error' && (
                <div className="form-feedback form-feedback--error" role="alert">
                  <AlertCircle size={16} aria-hidden="true" />
                  <span>{t.form_error}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="form-feedback form-feedback--success" role="status">
                  <CheckCircle size={16} aria-hidden="true" />
                  <span>{t.form_success}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary form-submit-btn">
                <Send size={16} aria-hidden="true" />
                {t.form_submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
