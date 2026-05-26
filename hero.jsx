/* global React, MascotStanding, MascotCloud, Balloon, Sparkle, Confetti, Veselkin, PHONE, PHONE_TEL, WA, MessengerButton */

const { useEffect, useState } = React;

// ----- Top nav -----
function TopNav({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`topnav ${scrolled ? 'topnav--scrolled' : ''}`} data-screen-label="Top Navigation">
      <div className="container topnav__row">
        <a href="#" className="topnav__logo" aria-label="Весёлкин">
          <span className="topnav__logo-text">
            <span className="topnav__logo-name"><Veselkin/></span>
            <span className="topnav__logo-sub">детский лофт · Жуковский</span>
          </span>
        </a>
        <nav className="topnav__links">
          <a href="#packages">Пакеты</a>
          <a href="#gallery">Лофт</a>
          <a href="#quests">Квесты</a>
          <a href="#reviews">Отзывы</a>
          <a href="#faq">Вопросы</a>
        </nav>
        <div className="topnav__cta">
          <a href={`tel:${PHONE_TEL}`} className="topnav__phone">{PHONE}</a>
          <button className="btn btn--primary btn--sm" onClick={onBook}>Забронировать</button>
        </div>
      </div>
    </header>
  );
}

// ----- Hero: Style A — Editorial premium -----
function HeroClassic({ onBook }) {
  return (
    <section className="hero hero--classic" data-screen-label="Hero (classic)">
      <div className="hero__bg-decor" aria-hidden="true">
        <div className="bg-blob" style={{ background: '#F5BE2A', width: 460, height: 460, top: -160, left: -120 }}/>
        <div className="bg-blob" style={{ background: '#2BC9D4', width: 360, height: 360, bottom: -120, right: -80, opacity: 0.25 }}/>
      </div>

      <div className="container hero__row">
        <div className="hero__copy">
          <h1 className="display hero__title">
            Праздник, который<br/>
            ребёнок <span className="u-accent">запомнит</span><br/>
            на годы вперёд
          </h1>

          <p className="hero__lead">
            Детский лофт в Жуковском для дней рождения, квестов и фотосессий.
            Уютно для 10 детей, просторно для 20, без чужих компаний рядом.
          </p>

          <div className="hero__ctas">
            <button className="btn btn--primary btn--lg" onClick={onBook}>
              Подобрать дату <span aria-hidden="true">→</span>
            </button>
            <a href={`tel:${PHONE_TEL}`} className="btn btn--ghost btn--lg">
              Позвонить
            </a>
          </div>

          <ul className="hero__meta">
            <li><strong>500+</strong><span>праздников провели</span></li>
            <li><strong>5 / 5</strong><span>оценка на Яндексе</span></li>
            <li><strong>27 чел.</strong><span>комфортно вмещает</span></li>
          </ul>
        </div>

        <div className="hero__art">
          <div className="hero__mascot-wrap">
            <Sparkle size={48} color="#F5BE2A" style={{position:'absolute', top: '8%', left: '8%', animation: 'spin-slow 14s linear infinite'}}/>
            <Sparkle size={28} color="#2BC9D4" style={{position:'absolute', top: '32%', right: '4%', animation: 'spin-slow 9s linear infinite reverse'}}/>
            <Sparkle size={22} color="#FF8A3D" style={{position:'absolute', bottom: '18%', left: '0%', animation: 'spin-slow 12s linear infinite'}}/>
            <MascotStanding size={520} parallax={true}/>
          </div>
          <div className="hero__art-card hero__art-card--1">
            <span className="hand" style={{fontSize: 32, color: '#6B2EBA'}}>уютно</span>
            <div className="hero__art-card-sub">10–15 детей, комфортно до 27 человек</div>
          </div>
        </div>
      </div>

      <div className="hero__marquee">
        <div className="marquee">
          <div className="marquee__track">
            {[...Array(2)].map((_, k) => (
              <React.Fragment key={k}>
                <span className="hand" style={{fontSize: 56, color: '#6B2EBA'}}>дни рождения</span>
                <span className="dot"/>
                <span className="hand" style={{fontSize: 56, color: '#2BC9D4'}}>квесты на 7 тем</span>
                <span className="dot"/>
                <span className="hand" style={{fontSize: 56, color: '#FF8A3D'}}>научное шоу</span>
                <span className="dot"/>
                <span className="hand" style={{fontSize: 56, color: '#E04A6B'}}>мыльные пузыри</span>
                <span className="dot"/>
                <span className="hand" style={{fontSize: 56, color: '#F5BE2A', WebkitTextStroke: '1.5px #1E1A38'}}>аквагрим</span>
                <span className="dot"/>
                <span className="hand" style={{fontSize: 56, color: '#4A1E84'}}>фотосессии</span>
                <span className="dot"/>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- Hero: Style B — Collage bold -----
function HeroBold({ onBook }) {
  return (
    <section className="hero hero--bold" data-screen-label="Hero (bold)">
      <Confetti count={20}/>
      <div className="hero-bold__inner container">
        <div className="hero-bold__title-wrap">
          <div className="hand hero-bold__pre">праздник для</div>
          <h1 className="display hero-bold__title">
            <span className="hero-bold__title-row hero-bold__title-row--purple">маленьких</span>
            <span className="hero-bold__title-row hero-bold__title-row--mascot">
              <span className="hero-bold__inline-mascot">
                <MascotStanding size={220} parallax={false}/>
              </span>
              <span className="hero-bold__title-cursive hand">непосед</span>
            </span>
            <span className="hero-bold__title-row hero-bold__title-row--turquoise">в&nbsp;Жуковском</span>
          </h1>
        </div>

        <div className="hero-bold__floats" aria-hidden="true">
          <div className="hero-bold__balloon" style={{top: '8%', left: '4%', width: 90, animation: 'balloon-sway 7s ease-in-out infinite'}}>
            <Balloon color="#F5BE2A"/>
          </div>
          <div className="hero-bold__balloon" style={{top: '12%', right: '8%', width: 80, animation: 'balloon-sway-2 8s ease-in-out infinite'}}>
            <Balloon color="#2BC9D4"/>
          </div>
          <div className="hero-bold__balloon" style={{bottom: '34%', right: '3%', width: 70, animation: 'balloon-sway 6s ease-in-out infinite'}}>
            <Balloon color="#FF8A3D"/>
          </div>
          <div className="hero-bold__balloon" style={{bottom: '28%', left: '6%', width: 64, animation: 'balloon-sway-2 9s ease-in-out infinite'}}>
            <Balloon color="#6B2EBA"/>
          </div>
          <Sparkle size={36} color="#F5BE2A" style={{position:'absolute', top: '40%', left: '14%', animation: 'spin-slow 12s linear infinite'}}/>
          <Sparkle size={28} color="#E04A6B" style={{position:'absolute', top: '32%', right: '18%', animation: 'spin-slow 10s linear infinite reverse'}}/>
        </div>

        <div className="hero-bold__bottom">
          <p className="hero-bold__lead">
            Камерный лофт на 27 человек. 7 готовых пакетов от 20 500 ₽,
            квесты на 7 тем, фотозона — всё включено.
          </p>
          <div className="hero-bold__ctas">
            <button className="btn btn--primary btn--lg" onClick={onBook}>
              Подобрать праздник <span aria-hidden="true">→</span>
            </button>
            <MessengerButton label="Написать в мессенджер" variant="accent" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TopNav, HeroClassic, HeroBold });
