import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { useScrollFade } from '../../hooks/useScrollFade';
import SectionTag from '../shared/SectionTag';
import Button from '../shared/Button';
import styles from './Contact.module.css';

// Web3Forms — configurar VITE_WEB3FORMS_KEY en .env.local
// Obtén tu Access Key gratis en https://web3forms.com
const W3F_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FALLBACK_EMAIL = 'jequinones87@gmail.com';

export default function Contact() {
  const { t } = useLang();
  const { ref, style } = useScrollFade();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!W3F_KEY) {
      const subject = encodeURIComponent(`${t('contact.form.emailSubject')} — ${form.name || t('contact.form.noName')}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `${t('contact.form.emailSubject')} — ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        window.gtag?.('event', 'contact_form_submit');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className={styles.contact}>
      <div className="container" ref={ref} style={style}>
        <div className={styles.grid}>
          <div>
            <SectionTag>{t('contact.tag')}</SectionTag>
            <h2 className={styles.title}>{t('contact.title')}</h2>
            <p className={styles.body}>{t('contact.body')}</p>
            <div className={styles.infoList}>
              <a href="mailto:jequinones87@gmail.com" className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <img src="/images/icon-mail.webp" alt="" className={styles.infoIconImg} />
                </span>
                jequinones87@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/juanquinonesrioseco"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoItem}
                onClick={() => window.gtag?.('event', 'linkedin_click')}
              >
                <span className={styles.infoIcon} aria-hidden="true">
                  <img src="/images/icon-linkedin.webp" alt="" className={styles.infoIconImg} />
                </span>
                linkedin.com/in/juanquinonesrioseco
              </a>
            </div>
          </div>

          <div className={styles.rightCol}>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">{t('contact.form.name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={onChange}
                  className={styles.input}
                  placeholder={t('contact.form.name')}
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">{t('contact.form.email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className={styles.input}
                  placeholder="email@example.com"
                  autoComplete="email"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  className={styles.textarea}
                  placeholder={t('contact.form.message')}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className={styles.submit}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>
              {status === 'success' && (
                <p className={`${styles.feedback} ${styles.feedbackOk}`}>{t('contact.form.success')}</p>
              )}
              {status === 'error' && (
                <p className={`${styles.feedback} ${styles.feedbackErr}`}>{t('contact.form.error')}</p>
              )}
            </form>
            <video
              className={styles.sideVideo}
              src="/yomismo.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Juan Enrique Quiñones"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
