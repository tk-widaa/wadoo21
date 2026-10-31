import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import {
  Sparkles,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from './BrandIcons';
import './Contact.css';

export default function Contact() {
  const { lang } = useLang();
  const t = content[lang].contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [linkedinImgError, setLinkedinImgError] = useState(false);
  const [whatsappImgError, setWhatsappImgError] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (status) setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      return;
    }
    // Demo submission handling
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact" aria-label={t.title}>
      {/* Ambient background glow */}
      <div className="contact__glow" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <Sparkles size={14} />
            <span>{t.label}</span>
          </span>
          <h2 className="section-title gradient-text">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        <div className="contact__grid">
          {/* Contact Information & Channels */}
          <div className="contact__info">
            {/* Direct Channel Cards */}
            <div className="contact__channels">
              {/* Email Card */}
              <a
                href={`mailto:${t.email}`}
                className="card contact__channel-card"
                aria-label="Send Email"
              >
                <div className="contact__channel-icon contact__channel-icon--email">
                  <Mail size={22} />
                </div>
                <div className="contact__channel-body">
                  <span className="contact__channel-label">Email</span>
                  <strong className="contact__channel-val">{t.email}</strong>
                </div>
                <ExternalLink size={16} className="contact__channel-ext" />
              </a>

              {/* Phone / WhatsApp Card */}
              <a
                href={`tel:${t.phone}`}
                className="card contact__channel-card"
                aria-label="Call Phone"
              >
                <div className="contact__channel-icon contact__channel-icon--phone">
                  <Phone size={22} />
                </div>
                <div className="contact__channel-body">
                  <span className="contact__channel-label">{t.phone_label}</span>
                  <strong className="contact__channel-val">{t.phone}</strong>
                </div>
                <ExternalLink size={16} className="contact__channel-ext" />
              </a>
            </div>

            {/* Social Channels — Facebook, LinkedIn (Custom Image Slot), WhatsApp (Custom Image Slot) */}
            <div className="card contact__socials-card">
              <h4 className="contact__socials-title">
                <MessageSquare size={16} />
                <span>{t.social_title || 'حساباتي على المنصات'}</span>
              </h4>

              <div className="contact__social-list">
                {/* Facebook with Lucide Icon */}
                <a
                  href={t.facebook || 'https://facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-item"
                >
                  <div className="contact__social-icon-box contact__social-icon-box--fb">
                    <FacebookIcon size={20} />
                  </div>
                  <div className="contact__social-text">
                    <strong>Facebook</strong>
                    <span>{lang === 'ar' ? 'تواصل عبر فيسبوك' : 'Connect on Facebook'}</span>
                  </div>
                  <ExternalLink size={15} className="contact__social-arrow" />
                </a>

                {/* LinkedIn — Dedicated Image Slot */}
                <a
                  href={t.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-item"
                >
                  <div className="contact__social-img-slot contact__social-img-slot--linkedin">
                    {!linkedinImgError ? (
                      <img
                        src="/icons/linkedin.png"
                        alt="LinkedIn"
                        className="contact__custom-img"
                        onError={() => setLinkedinImgError(true)}
                      />
                    ) : (
                      <span className="contact__custom-fallback">in</span>
                    )}
                  </div>
                  <div className="contact__social-text">
                    <strong>LinkedIn</strong>
                    <span>{lang === 'ar' ? 'الملف المهني لينكد إن' : 'Professional Profile'}</span>
                  </div>
                  <ExternalLink size={15} className="contact__social-arrow" />
                </a>

                {/* WhatsApp — Dedicated Image Slot */}
                <a
                  href={t.whatsapp || `https://wa.me/20115830208`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-item"
                >
                  <div className="contact__social-img-slot contact__social-img-slot--whatsapp">
                    {!whatsappImgError ? (
                      <img
                        src="/icons/whatsapp.png"
                        alt="WhatsApp"
                        className="contact__custom-img"
                        onError={() => setWhatsappImgError(true)}
                      />
                    ) : (
                      <span className="contact__custom-fallback">WA</span>
                    )}
                  </div>
                  <div className="contact__social-text">
                    <strong>WhatsApp</strong>
                    <span>{lang === 'ar' ? 'محادثة فورية مباشرة' : 'Instant Chat / Message'}</span>
                  </div>
                  <ExternalLink size={15} className="contact__social-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Elegant Interactive Message Form */}
          <div className="card contact__form-card">
            <h3 className="contact__form-title">
              {lang === 'ar' ? 'أرسل رسالة مباشرة' : 'Send a Direct Message'}
            </h3>
            <p className="contact__form-sub">
              {lang === 'ar'
                ? 'لديك فكرة مشروع أو استفسار؟ املأ النموذج وسأرد عليك في أقرب وقت.'
                : 'Have a project idea or inquiry? Fill out the form below and I will get back to you.'}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  {t.form_name}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={lang === 'ar' ? 'مثال: محمد أحمد' : 'e.g. John Doe'}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  {t.form_email}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  {t.form_message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={
                    lang === 'ar'
                      ? 'اكتب تفاصيل مشروعك أو رسالتك هنا...'
                      : 'Describe your project or inquiry here...'
                  }
                  className="form-input form-textarea"
                  required
                />
              </div>

              {/* Status Notifications */}
              {status === 'error' && (
                <div className="form-alert form-alert--error" role="alert">
                  <AlertCircle size={18} />
                  <span>{t.form_error}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="form-alert form-alert--success" role="alert">
                  <CheckCircle2 size={18} />
                  <span>{t.form_success}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary form-submit-btn">
                <span>{t.form_submit}</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
