/* global React, PACKAGES, USPS, QUESTS, SHOWS, REVIEWS, FAQ, HOURLY, ANIMATION, SHOWS_PRICE, COMBOS, MASTER, PHOTO_ZONES, DECOR, EXTRAS, PHONE, PHONE_TEL, WA, TG, MAX, VK, IG, ADDRESS, HOURS, MascotCloud, MascotStanding, Balloon, Sparkle, Veselkin, MessengerButton */

const { useState, useMemo } = React;

const fmt = n => n.toLocaleString('ru-RU') + ' ₽';

// ----- Inline icon set (lightweight, geometric) -----
function Icon({ name, size = 28, color = "currentColor" }) {
  const c = color, s = size;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case 'home': return (<svg {...common}><path d="M3 11l9-8 9 8"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>);
    case 'brush': return (<svg {...common}><path d="M14 4l6 6-9 9-6-6z"/><path d="M5 13l-3 3 5 5 3-3"/><path d="M18 8l2-2"/></svg>);
    case 'camera': return (<svg {...common}><path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/></svg>);
    case 'car': return (<svg {...common}><path d="M3 12l2-5h14l2 5"/><path d="M3 12h18v6H3z"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>);
    case 'plate': return (<svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 7v1"/></svg>);
    case 'puzzle': return (<svg {...common}><path d="M10 4h4a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h2v4a2 2 0 0 1-2 2v-1a2 2 0 0 0-2-2h-1v2a2 2 0 0 1-2 2H8v-2a2 2 0 0 0-2-2H4v-4h2a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2z"/></svg>);
    case 'phone': return (<svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>);
    case 'wa': return (<svg {...common}><path d="M3 21l1.65-4.95A9 9 0 1 1 21 12a9 9 0 0 1-12.5 8.3L3 21z"/><path d="M9 9.5c0 4 3.5 7.5 7.5 7.5l1.5-2-3-1-1 1c-1.5-.5-3-2-3.5-3.5l1-1-1-3z"/></svg>);
    case 'tg': return (<svg {...common}><path d="M21 4l-3 16-5.5-4.5L9 19l-1-5L21 4z"/><path d="M21 4L8 14"/></svg>);
    case 'pin': return (<svg {...common}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
    case 'clock': return (<svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case 'star': return (<svg {...common} fill={c}><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>);
    case 'check': return (<svg {...common}><path d="M4 12l5 5L20 6"/></svg>);
    case 'arrow': return (<svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>);
    default: return null;
  }
}

// ===== USPs strip =====
function UspSection() {
  return (
    <section id="why" className="section section--tight usp-section" data-screen-label="USPs">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Почему <Veselkin caps/></div>
            <h2 className="display">Не как все детские <br/>лофты в Жуковском</h2>
          </div>
          <div className="section-head__meta">
            Мы провели больше 500 праздников. За это время поняли, что важно родителям —
            и собрали лофт под их запросы, а не под красивые фото.
          </div>
        </div>
        <div className="usp-grid">
          {USPS.map((u, i) => (
            <div key={u.title} className="usp-card reveal" style={{transitionDelay: `${i * 60}ms`}}>
              <div className="usp-card__icon" style={{color: ['#6B2EBA','#2BC9D4','#FF8A3D','#E04A6B','#F5BE2A','#4A1E84'][i % 6]}}>
                <Icon name={u.icon} size={28}/>
              </div>
              <h3 className="usp-card__title">{u.title}</h3>
              <p className="usp-card__text">{u.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Promo / Action ribbon =====
function PromoSection({ onBook }) {
  return (
    <section className="section promo-section" data-screen-label="Promo">
      <div className="container">
        <div className="promo">
          <div className="promo__bg" aria-hidden="true">
            <Sparkle size={48} color="#F5BE2A" style={{position:'absolute', top: '12%', left: '6%', animation: 'spin-slow 12s linear infinite'}}/>
            <Sparkle size={28} color="#FFFFFF" style={{position:'absolute', top: '60%', left: '38%', animation: 'spin-slow 9s linear infinite reverse', opacity: 0.6}}/>
            <Sparkle size={32} color="#F5BE2A" style={{position:'absolute', bottom: '14%', right: '12%', animation: 'spin-slow 14s linear infinite'}}/>
            <div style={{position:'absolute', top:'-10%', right:'8%', width:72, animation:'balloon-sway 7s ease-in-out infinite'}}>
              <Balloon color="#F5BE2A"/>
            </div>
            <div style={{position:'absolute', bottom:'-8%', left:'-2%', width:64, animation:'balloon-sway-2 8s ease-in-out infinite'}}>
              <Balloon color="#2BC9D4"/>
            </div>
          </div>
          <div className="promo__tag">Акция · только новым гостям</div>
          <h2 className="display promo__title">
            +1 час аренды <br/><span className="hand promo__title-hand">в подарок</span>
          </h2>
          <p className="promo__text">
            Бронируете лофт у нас в первый раз? Добавим дополнительный час бесплатно —
            к любому пакету. Чтобы вы не торопились и насладились праздником.
          </p>
          <div className="promo__ctas">
            <button className="btn btn--accent btn--lg" onClick={() => onBook()}>
              Забронировать
            </button>
            <MessengerButton label="Уточнить в мессенджере" variant="white" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Package cards =====
function PackagesSection({ onBook }) {
  const [day, setDay] = useState('week'); // 'week' (Пн-Чт) or 'wend' (Пт-Вс)
  return (
    <section id="packages" className="section packages-section" data-screen-label="Packages">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Готовые пакеты</div>
            <h2 className="display">Шесть сценариев <br/>под любой возраст и бюджет</h2>
          </div>
          <div className="section-head__meta">
            Каждый пакет — это уже всё: лофт, аниматор, оформление, посуда и уборка.
            Можно прийти и просто праздновать.
          </div>
        </div>

        <div className="day-switch">
          <button onClick={() => setDay('week')} className={`day-switch__btn ${day === 'week' ? 'is-active' : ''}`}>
            Пн&nbsp;–&nbsp;Чт
          </button>
          <button onClick={() => setDay('wend')} className={`day-switch__btn ${day === 'wend' ? 'is-active' : ''}`}>
            Пт&nbsp;–&nbsp;Вс
          </button>
          <span className="day-switch__hint">Цена в выходные выше</span>
        </div>

        <div className="pkg-grid">
          {PACKAGES.map((p, i) => (
            <article key={p.id} className={`pkg ${p.popular ? 'pkg--popular' : ''} reveal`}
              style={{transitionDelay: `${i * 80}ms`, '--pkg-color': p.color, '--pkg-bg': p.bg}}>
              {p.popular && <span className="pkg__badge">Хит сезона</span>}
              <header className="pkg__head">
                <div className="pkg__name display">{p.name}</div>
                <div className="pkg__tag">{p.tagline}</div>
              </header>
              <div className="pkg__meta">
                <span>⏱ {p.duration}</span>
                <span>· 🎈 {p.capacity}</span>
              </div>
              <ul className="pkg__items">
                {p.items.map((it, k) => (
                  <li key={k}><Icon name="check" size={16}/> <span>{it}</span></li>
                ))}
              </ul>
              <footer className="pkg__foot">
                <div className="pkg__price">
                  <span className="pkg__price-num">{fmt(day === 'week' ? p.priceWeek : p.priceWend)}</span>
                  <span className="pkg__price-day">{day === 'week' ? 'будни' : 'выходные'}</span>
                </div>
                <button className="btn btn--primary btn--sm" onClick={() => onBook(p.id)}>
                  Выбрать
                </button>
              </footer>
            </article>
          ))}
        </div>

        <div className="pkg-foot-cta">
          <span className="hand" style={{fontSize: 36, color: '#6B2EBA'}}>не нашли своё?</span>
          <p>Соберём пакет под ваш бюджет, тему и возраст из почасовой аренды + шоу + мастер-класса.</p>
          <button className="btn btn--ghost" onClick={() => onBook('custom')}>Собрать индивидуально</button>
        </div>
      </div>
    </section>
  );
}

// ===== Gallery (loft photos masonry) =====
const LOFT_PHOTOS = [
  { src: 'assets/loft-6.jpg', alt: 'Детский лофт Весёлкин в Жуковском — авторская роспись стены с маскотом' },
  { src: 'assets/loft-1.jpg', alt: 'Игровая зона детского лофта в Жуковском — горка и сухой бассейн с шариками' },
  { src: 'assets/loft-4.jpg', alt: 'Праздничный стол на день рождения ребёнка с фотозоной — лофт Весёлкин' },
  { src: 'assets/loft-2.jpg', alt: 'Зал детского лофта для дня рождения в Жуковском — общий вид' },
  { src: 'assets/loft-3.jpg', alt: 'Игровая зона лофта для детских праздников — куклы и развивающие игрушки' },
  { src: 'assets/loft-7.jpg', alt: 'Большая игровая зона в детском лофте Весёлкин — общий вид' },
  { src: 'assets/loft-5.jpg', alt: 'Светлый зал детского лофта с большими окнами и игрушками' },
];

function GallerySection() {
  return (
    <section id="gallery" className="section gallery-section" data-screen-label="Gallery">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Лофт изнутри</div>
            <h2 className="display">Где проходит <br/>ваш праздник</h2>
          </div>
          <div className="section-head__meta">
            Авторская роспись по мотивам джунглей: тукан, жираф, фламинго и наш <Veselkin/>.
            Игровой комплекс, сухой бассейн, банкетная зона на 25 человек, место под фотозону, видео и аудио сопровождение вашего праздника.
          </div>
        </div>

        <div className="gallery-masonry">
          <div className="gallery-masonry__item gallery-masonry__item--big">
            <div className="ph"><img src={LOFT_PHOTOS[0].src} alt={LOFT_PHOTOS[0].alt} loading="lazy"/></div>
            <span className="gallery-caption hand" style={{fontSize: 28}}>наш <Veselkin/> ↗</span>
          </div>
          <div className="gallery-masonry__col">
            <div className="ph gallery-masonry__item--tall"><img src={LOFT_PHOTOS[1].src} alt={LOFT_PHOTOS[1].alt} loading="lazy"/></div>
            <div className="ph"><img src={LOFT_PHOTOS[2].src} alt={LOFT_PHOTOS[2].alt} loading="lazy"/></div>
          </div>
          <div className="gallery-masonry__col">
            <div className="ph"><img src={LOFT_PHOTOS[3].src} alt={LOFT_PHOTOS[3].alt} loading="lazy"/></div>
            <div className="ph gallery-masonry__item--tall"><img src={LOFT_PHOTOS[5].src} alt={LOFT_PHOTOS[5].alt} loading="lazy"/></div>
          </div>
          <div className="gallery-masonry__col">
            <div className="ph gallery-masonry__item--tall"><img src={LOFT_PHOTOS[4].src} alt={LOFT_PHOTOS[4].alt} loading="lazy"/></div>
            <div className="ph"><img src={LOFT_PHOTOS[6].src} alt={LOFT_PHOTOS[6].alt} loading="lazy"/></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Photo zones showcase =====
const PHOTOZONE_GALLERY = [
  { src: 'assets/photozone-safari.jpg', name: 'Сафари', tag: 'Малышам', color: '#3F7A3F', desc: 'Жираф, слон, лев — мягкая палитра для годовасиков' },
  { src: 'assets/photozone-barbie.jpg', name: 'Barbie', tag: 'Для девочек', color: '#E16BAE', desc: 'Розовая арка, всё в стиле Barbie — хит для 5–9 лет' },
  { src: 'assets/photozone-baby.jpg', name: 'Первый годик', tag: 'Бенто-арка', color: '#D1334A', desc: 'Буквы имени, корона, фото-гирлянда «один год роста»' },
  { src: 'assets/photozone-green.jpg', name: 'Имя на мольберте', tag: 'Универсал', color: '#1E6E3F', desc: 'Имя именинника на круглом плакате — кадры на память' },
  { src: 'assets/photozone-transformers.jpg', name: 'Трансформеры', tag: 'Для мальчишек', color: '#1E3FB2', desc: 'Bumblebee и Optimus Prime в полный рост, фольга и шины' },
];

function PhotozonesSection({ onBook }) {
  return (
    <section className="section photozones-section" data-screen-label="Photo zones">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Фотозоны</div>
            <h2 className="display">Соберём декор <br/>под любую тему</h2>
          </div>
          <div className="section-head__meta">
            От нежного сафари до неоновых трансформеров. Подбираем цвет и сюжет под именинника —
            идею тоже можем предложить, если не определились.
          </div>
        </div>

        <div className="pz-grid">
          {PHOTOZONE_GALLERY.map((p, i) => (
            <article key={p.src} className={`pz pz--${i}`} style={{'--pz-c': p.color}}>
              <div className="pz__img">
                <img src={p.src} alt={`Фотозона «${p.name}» на день рождения ребёнка — детский лофт Весёлкин в Жуковском`} loading="lazy"/>
              </div>
              <div className="pz__body">
                <span className="pz__tag">{p.tag}</span>
                <h3 className="pz__name">{p.name}</h3>
                <p className="pz__desc">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="pz-foot">
          <div className="pz-foot__copy">
            <span className="hand pz-foot__hand">а ещё:</span>
            <p>пираты, единороги, Гарри Поттер, динозавры, космос, Холодное сердце, машинки — любая тема, которую любит ваш ребёнок.</p>
          </div>
          <button className="btn btn--primary btn--lg" onClick={() => onBook && onBook()}>
            Обсудить идею
          </button>
        </div>
      </div>
    </section>
  );
}

// ===== Party moments — horizontal marquee ===== 
const PARTY_PHOTOS = [
  'assets/party-1.jpg',
  'assets/party-2.jpg',
  'assets/party-3.jpg',
  'assets/party-4.jpg',
  'assets/party-5.jpg',
  'assets/party-6.jpg',
  'assets/party-7.jpg',
  'assets/party-8.jpg',
  'assets/party-9.jpg',
];

function PartyMomentsSection() {
  return (
    <section className="section party-section" data-screen-label="Party moments">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Моменты с праздников</div>
            <h2 className="display">Так выглядят <br/>наши гости</h2>
          </div>
          <div className="section-head__meta">
            Эмоции, ради которых вы и устраиваете праздник: восторг от первой встречи с любимым героем,
            смех, когда никто не помнит про телефоны, и кадры, которые потом висят на холодильнике.
            Снято на реальных праздниках.
          </div>
        </div>
      </div>

      <div className="party-marquee">
        <div className="party-marquee__track">
          {[...PARTY_PHOTOS, ...PARTY_PHOTOS].map((src, i) => (
            <div key={i} className="party-marquee__item" style={{transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (0.3 + (i % 3) * 0.4)}deg)`}}>
              <img src={src} alt="Детский праздник и день рождения в лофте Весёлкин в Жуковском — фото с торжества" loading="lazy"/>
            </div>
          ))}
        </div>
      </div>

      <div className="container party-section__cta">
        <span className="hand party-section__hand">Ещё больше фото, видео и другого контента:</span>
        <div className="party-section__links">
          <a href={TG} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">Telegram-канал</a>
          <a href={IG} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">Instagram</a>
          <a href={VK} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">VK</a>
        </div>
      </div>
    </section>
  );
}

// ===== Quests + Shows =====
function QuestsSection() {
  return (
    <section id="quests" className="section quests-section" data-screen-label="Quests & Shows">
      <div className="quests-section__bg" aria-hidden="true">
        <div className="bg-blob" style={{ background: '#6B2EBA', width: 500, height: 500, top: -150, right: -120, opacity: 0.18 }}/>
        <div className="bg-blob" style={{ background: '#2BC9D4', width: 360, height: 360, bottom: -100, left: -80, opacity: 0.18 }}/>
      </div>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Квесты и шоу</div>
            <h2 className="display">Выберите тему — <br/>дети уже визжат</h2>
          </div>
          <div className="section-head__meta">
            Сценарии адаптируем под возраст и интересы именинника — от 2 до 9 лет.
            Без скучных конкурсов «угадай животное по звуку».
          </div>
        </div>

        <div className="quest-grid">
          {QUESTS.map((q, i) => (
            <div key={q.name} className="quest-chip reveal" style={{'--qc': q.color, transitionDelay: `${i * 50}ms`}}>
              <span className="quest-chip__emoji" aria-hidden="true">{q.emoji}</span>
              <span className="quest-chip__name">{q.name}</span>
            </div>
          ))}
        </div>

        <div className="section-sub">Шоу-программы на выбор</div>
        <div className="show-grid">
          {SHOWS.map((s, i) => (
            <div key={s.name} className="show-card reveal" style={{transitionDelay: `${i * 50}ms`}}>
              <div className="show-card__title">{s.name}</div>
              <div className="show-card__desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== How it works (timing) =====
const STEPS = [
  { time: '–10 дней', title: 'Бронь и согласование', text: 'Звонок, выбор программы, цвета шаров. Предоплата 5000 ₽ фиксирует дату.' },
  { time: '–1 день', title: 'Финальные детали', text: 'Сверяем все детали, чтобы вы пришли и просто отдыхали — обо всём остальном мы уже позаботились.' },
  { time: 'День Х', title: 'Праздник', text: 'Вы приходите за 20 минут до начала. Лофт оформлен, стол накрыт, аниматор готов.' },
  { time: 'После', title: 'Уборка — наша', text: 'Вы забираете торт, подарки и эмоции. Уборку (даже конфетти) делаем мы.' },
];

function HowSection() {
  return (
    <section className="section how-section" data-screen-label="How it works">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Шаг за шагом</div>
            <h2 className="display">От звонка до незабываемых <br/>воспоминаний — 4 простых шага</h2>
          </div>
        </div>
        <div className="how-grid">
          {STEPS.map((s, i) => (
            <div key={s.title} className="how-step reveal" style={{transitionDelay: `${i * 80}ms`}}>
              <div className="how-step__num">{String(i+1).padStart(2,'0')}</div>
              <div className="how-step__time">{s.time}</div>
              <div className="how-step__title">{s.title}</div>
              <div className="how-step__text">{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Icon, UspSection, PromoSection, PackagesSection, GallerySection, PhotozonesSection, PartyMomentsSection, QuestsSection, HowSection, fmt });
