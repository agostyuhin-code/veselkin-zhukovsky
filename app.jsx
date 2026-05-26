/* global React, ReactDOM */
/* global TopNav, HeroClassic, HeroBold, UspSection, PackagesSection, GallerySection, QuestsSection, HowSection, ConfigSection, ReviewsSection, FaqSection, ContactSection, Footer, useRevealOnScroll, Icon, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor, TweakToggle, PHONE, PHONE_TEL, WA */

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "classic",
  "fontHeading": "unbounded",
  "palette": "purple",
  "showReviews": true,
  "showHow": true,
  "showQuests": true,
  "showConfig": true
}/*EDITMODE-END*/;

const PALETTES = {
  purple: { brand: '#6B2EBA', brandDeep: '#4A1E84', brandSoft: '#EFE5FB' },
  turquoise: { brand: '#0E8A95', brandDeep: '#0A6770', brandSoft: '#DAF6F8' },
  orange: { brand: '#D9591E', brandDeep: '#A8420F', brandSoft: '#FFE0CC' },
  mixed: { brand: '#6B2EBA', brandDeep: '#4A1E84', brandSoft: '#EFE5FB' }, // same as purple, gradients elsewhere
};

const FONTS = {
  unbounded: { display: '"Unbounded", system-ui, sans-serif' },
  manrope: { display: '"Manrope", system-ui, sans-serif' },
  rubik: { display: '"Rubik", system-ui, sans-serif' },
  fraunces: { display: '"Fraunces", Georgia, serif' },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [bookingPkg, setBookingPkg] = useState(null);
  useRevealOnScroll();

  // Apply palette + font via CSS custom props on :root
  useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.purple;
    document.documentElement.style.setProperty('--brand-purple', p.brand);
    document.documentElement.style.setProperty('--brand-purple-deep', p.brandDeep);
    document.documentElement.style.setProperty('--brand-purple-soft', p.brandSoft);

    const f = FONTS[t.fontHeading] || FONTS.unbounded;
    document.documentElement.style.setProperty('--f-display', f.display);
  }, [t.palette, t.fontHeading]);

  function openBooking(pkg) {
    setBookingPkg(pkg || 'custom');
    setTimeout(() => {
      const el = document.getElementById('book');
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }, 50);
  }

  return (
    <>
      <TopNav onBook={() => openBooking()} />

      {t.hero === 'bold' ? <HeroBold onBook={() => openBooking()} /> : <HeroClassic onBook={() => openBooking()} />}

      <UspSection />
      <PromoSection onBook={() => openBooking()} />
      <PackagesSection onBook={openBooking} />
      <GallerySection />
      <PhotozonesSection onBook={openBooking} />
      <PartyMomentsSection />
      {t.showQuests && <QuestsSection />}
      {t.showHow && <HowSection />}
      {t.showConfig && <ConfigSection onBook={openBooking} />}
      {t.showReviews && <ReviewsSection />}
      <FaqSection />
      <ContactSection initialPkg={bookingPkg} />
      <Footer />

      {/* Sticky CTA bar (mobile) */}
      <div className="cta-bar">
        <a href={`tel:${PHONE_TEL}`}><Icon name="phone" size={18}/> Позвонить</a>
        <button className="btn btn--primary" onClick={() => openBooking()}>Заявка</button>
      </div>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Главный экран">
          <TweakRadio
            label="Стиль"
            value={t.hero}
            onChange={v => setTweak('hero', v)}
            options={[
              { value: 'classic', label: 'Классика' },
              { value: 'bold', label: 'Смелый' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Палитра">
          <TweakRadio
            label="Главный цвет"
            value={t.palette}
            onChange={v => setTweak('palette', v)}
            options={[
              { value: 'purple', label: 'Фиолет' },
              { value: 'turquoise', label: 'Бирюза' },
              { value: 'orange', label: 'Оранж' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Шрифт заголовков">
          <TweakRadio
            label="Семейство"
            value={t.fontHeading}
            onChange={v => setTweak('fontHeading', v)}
            options={[
              { value: 'unbounded', label: 'Unbounded' },
              { value: 'rubik', label: 'Rubik' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Секции">
          <TweakToggle label="Квесты и шоу" value={t.showQuests} onChange={v => setTweak('showQuests', v)} />
          <TweakToggle label="Шаг за шагом" value={t.showHow} onChange={v => setTweak('showHow', v)} />
          <TweakToggle label="Конструктор / прайс" value={t.showConfig} onChange={v => setTweak('showConfig', v)} />
          <TweakToggle label="Отзывы" value={t.showReviews} onChange={v => setTweak('showReviews', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
