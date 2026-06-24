"use client";

import { useEffect, useState } from "react";
import { DONATE_COPY, LANG_STORAGE_KEY, type Lang } from "../i18n";
import DonatePanel from "./DonatePanel";

const DONATION_LINKS = {
  monobank: "https://send.monobank.ua/jar/2Aw9NP47Be",
  paypal: "#paypal-link-needed",
};

export default function DonateContent({ portraitSrc }: { portraitSrc: string }) {
  const [lang, setLang] = useState<Lang>("en");
  const [isPaypalQrOpen, setIsPaypalQrOpen] = useState(false);
  const t = DONATE_COPY[lang];
  const paypalFallbackUrl = DONATION_LINKS.paypal.startsWith("http")
    ? DONATION_LINKS.paypal
    : null;

  useEffect(() => {
    const savedLang = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    if (savedLang === "en" || savedLang === "ru" || savedLang === "ua") {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang === "ua" ? "uk" : lang;
    document.title = t.pageTitle;

    const metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDescription) {
      metaDescription.content = t.pageDescription;
    }
  }, [lang, t.pageDescription, t.pageTitle]);

  useEffect(() => {
    if (!isPaypalQrOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPaypalQrOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaypalQrOpen]);

  return (
    <section className="donate-shell" aria-labelledby="donate-title">
      <a className="donate-back-link" href="/">
        <span aria-hidden="true">←</span>
        {t.back}
      </a>

      <DonatePanel>
        <div className="donate-copy">
          <p className="sources-kicker">{t.kicker}</p>
          <h1 id="donate-title">{t.title}</h1>

          <div className="donate-text">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              {t.contactIntro}
              <br />
              <a href="mailto:mariaparakhina.studio@gmail.com">
                mariaparakhina.studio@gmail.com
              </a>
            </p>
          </div>

          <div className="donation-options" aria-label={t.donationLinksAria}>
            <a
              className="donation-card"
              href={DONATION_LINKS.monobank}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="donation-logo donation-logo-mono" aria-hidden="true">
                <span />
              </span>
              <span>
                <strong>Monobank</strong>
                <small>{t.monobankText}</small>
              </span>
            </a>

            <button
              type="button"
              className="donation-card donation-card-paypal-qr"
              onClick={() => setIsPaypalQrOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isPaypalQrOpen}
              aria-label={t.paypalQrOpen}
            >
              <span className="paypal-qr-copy">
                <span className="paypal-qr-label">{t.paypalQrLabel}</span>
                <strong>{t.paypalQrTitle}</strong>
                <small>{t.paypalQrSubtitle}</small>
              </span>
              <span className="paypal-qr-preview" aria-hidden="true">
                <img src="/images/paypal-qr.jpg" alt="" />
              </span>
              <span className="paypal-qr-instruction">{t.paypalQrInstruction}</span>
            </button>
          </div>
        </div>

        <aside className="donate-portrait-wrap" aria-label={t.portraitAria}>
          <div className="donate-portrait">
            <img src={portraitSrc} alt={t.portraitAlt} />
          </div>
        </aside>
      </DonatePanel>

      {isPaypalQrOpen && (
        <div
          className="paypal-qr-modal"
          role="dialog"
          aria-modal="true"
          aria-label={t.paypalQrTitle}
          onClick={() => setIsPaypalQrOpen(false)}
        >
          <div className="paypal-qr-modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="paypal-qr-modal-close"
              onClick={() => setIsPaypalQrOpen(false)}
              aria-label={t.paypalQrClose}
            >
              ×
            </button>
            <p className="paypal-qr-label">{t.paypalQrLabel}</p>
            <h2>{t.paypalQrTitle}</h2>
            <p>{t.paypalQrSubtitle}</p>
            <div className="paypal-qr-modal-image">
              <img src="/images/paypal-qr.jpg" alt={t.paypalQrAlt} />
            </div>
            <p className="paypal-qr-modal-note">{t.paypalQrInstruction}</p>
            {paypalFallbackUrl && (
              <a
                className="paypal-qr-fallback"
                href={paypalFallbackUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t.paypalFallback}
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
