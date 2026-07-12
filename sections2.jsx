/* global React, REVIEWS, FAQ, HOURLY, ANIMATION, SHOWS_PRICE, COMBOS, MASTER, PHOTO_ZONES, DECOR, EXTRAS, PHONE, PHONE_TEL, WA, TG, MAX, VK, IG, ADDRESS, HOURS, Icon, Veselkin, fmt */

const { useState, useMemo } = React;

// ===== Configurator / Hourly =====
function ConfigSection({ onBook }) {
  const [hours, setHours] = useState(3);
  const [day, setDay] = useState('week');
  const [animator, setAnimator] = useState(1.5); // hours
  const [shows, setShows] = useState([]);
  const [decor, setDecor] = useState(true);
  const [photo, setPhoto] = useState(0); // hours
  const [photoZone, setPhotoZone] = useState('bento'); // none, fountain, bento, big

  const pricePerHour = day === 'week' ? HOURLY.weekday : HOURLY.weekend;
  const animatorPrice = { 0: 0, 1: 6500, 1.5: 9000, 2: 11500 }[animator] || 0;
  const photoPrice = photo * 6000;
  const decorPrice = decor ? 4000 : 0;
  const showsPrice = shows.reduce((acc, idx) => acc + SHOWS_PRICE[idx].price, 0);
  const photoZonePrice = { none: 0, fountain: 2800, bento: 4500, big: 9000 }[photoZone] || 0;
  const cleaningFee = 1500;
  const total = hours * pricePerHour + animatorPrice + photoPrice + decorPrice + showsPrice + photoZonePrice + cleaningFee;

  function toggleShow(i) {
    setShows(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  return (
    <section id="config" className="section config-section" data-screen-label="Configurator">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Конструктор праздника</div>
            <h2 className="display">Соберите свой <br/>пакет под бюджет</h2>
          </div>
          <div className="section-head__meta">
            Можно арендовать только лофт почасово — без шоу, без аниматора.
            А можно добавить именно то, что хотите. Итоговая сумма — справа.
          </div>
        </div>

        <div className="config">
          <div className="config__form">
            <div className="config__row">
              <div className="config__label">День недели</div>
              <div className="config__group">
                <button onClick={() => setDay('week')} className={`config__chip ${day === 'week' ? 'is-active' : ''}`}>
                  Пн – Чт<br/><span className="config__chip-sub">{fmt(HOURLY.weekday)} / час</span>
                </button>
                <button onClick={() => setDay('wend')} className={`config__chip ${day === 'wend' ? 'is-active' : ''}`}>
                  Пт – Вс<br/><span className="config__chip-sub">{fmt(HOURLY.weekend)} / час</span>
                </button>
              </div>
            </div>

            <div className="config__row">
              <div className="config__label">Сколько часов аренды <strong>{hours} ч</strong></div>
              <input type="range" min="2" max="6" step="1" value={hours}
                onChange={e => setHours(+e.target.value)} className="config__range"/>
              <div className="config__range-marks"><span>2 ч</span><span>4 ч</span><span>6 ч</span></div>
            </div>

            <div className="config__row">
              <div className="config__label">Аниматор</div>
              <div className="config__group">
                {[
                  { v: 0, label: 'Без аниматора', sub: 'только аренда' },
                  { v: 1, label: '1 час', sub: '6 500 ₽' },
                  { v: 1.5, label: '1,5 часа', sub: '9 000 ₽' },
                  { v: 2, label: '2 часа', sub: '11 500 ₽' },
                ].map(opt => (
                  <button key={opt.v} onClick={() => setAnimator(opt.v)}
                    className={`config__chip ${animator === opt.v ? 'is-active' : ''}`}>
                    {opt.label}<br/><span className="config__chip-sub">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="config__row">
              <div className="config__label">Фотозона</div>
              <div className="config__group">
                {[
                  { v: 'none', label: 'Нет', sub: '0 ₽' },
                  { v: 'fountain', label: 'Фонтаны шаров', sub: 'от 2 800 ₽' },
                  { v: 'bento', label: 'Бенто', sub: 'от 4 500 ₽' },
                  { v: 'big', label: 'Большая круглая', sub: 'от 9 000 ₽' },
                ].map(opt => (
                  <button key={opt.v} onClick={() => setPhotoZone(opt.v)}
                    className={`config__chip ${photoZone === opt.v ? 'is-active' : ''}`}>
                    {opt.label}<br/><span className="config__chip-sub">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="config__row">
              <div className="config__label">Базовое оформление и сервировка</div>
              <label className="config__toggle">
                <input type="checkbox" checked={decor} onChange={e => setDecor(e.target.checked)}/>
                <span className="config__toggle-track"><span className="config__toggle-thumb"/></span>
                <span>10 шаров, шар-цифра, растяжка + сервировка стола — <strong>4 000 ₽</strong></span>
              </label>
            </div>

            <div className="config__row">
              <div className="config__label">Фотограф (час)</div>
              <div className="config__group">
                {[0, 1, 2, 3].map(h => (
                  <button key={h} onClick={() => setPhoto(h)} className={`config__chip ${photo === h ? 'is-active' : ''}`}>
                    {h === 0 ? 'Нет' : `${h} ч`}<br/>
                    <span className="config__chip-sub">{h === 0 ? '0 ₽' : fmt(h * 6000)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="config__row">
              <div className="config__label">Дополнительные шоу</div>
              <div className="config__shows">
                {SHOWS_PRICE.map((s, i) => (
                  <button key={s.name} onClick={() => toggleShow(i)}
                    className={`config__show ${shows.includes(i) ? 'is-active' : ''}`}>
                    <span>{s.name}</span>
                    <strong>{fmt(s.price)}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="config__sum">
            <div className="config__sum-head">Ваш праздник</div>
            <ul className="config__sum-list">
              <li><span>Аренда {hours} ч ({day === 'week' ? 'будни' : 'выходные'})</span><strong>{fmt(hours * pricePerHour)}</strong></li>
              {animator > 0 && <li><span>Аниматор {animator} ч</span><strong>{fmt(animatorPrice)}</strong></li>}
              {photoZone !== 'none' && <li><span>Фотозона</span><strong>{fmt(photoZonePrice)}</strong></li>}
              {decor && <li><span>Оформление + сервировка</span><strong>{fmt(decorPrice)}</strong></li>}
              {photo > 0 && <li><span>Фотограф {photo} ч</span><strong>{fmt(photoPrice)}</strong></li>}
              {shows.map(i => <li key={i}><span>{SHOWS_PRICE[i].name}</span><strong>{fmt(SHOWS_PRICE[i].price)}</strong></li>)}
              <li><span>Уборка стандартная</span><strong>{fmt(cleaningFee)}</strong></li>
            </ul>
            <div className="config__sum-total">
              <span>Итого, от</span>
              <strong>{fmt(total)}</strong>
            </div>
            <p className="config__sum-note">Стандартная уборка (1 500 ₽) не включена в стоимость при почасовой аренде и оплачивается дополнительно.</p>
            <button className="btn btn--primary btn--lg" onClick={() => onBook('custom')}>
              Забронировать
            </button>
          </aside>
        </div>

        <details className="price-list">
          <summary>Посмотреть полный прайс-лист</summary>
          <div className="price-list__cols">
            <div>
              <h4>Аренда</h4>
              <ul>
                <li><span>Будни (пн–пт до 16:00)</span><strong>{fmt(HOURLY.weekday)} / час</strong></li>
                <li><span>Выходные (пт с 16:00, сб, вс)</span><strong>{fmt(HOURLY.weekend)} / час</strong></li>
              </ul>
              <h4>Анимация</h4>
              <ul>{ANIMATION.map(x => <li key={x.name}><span>{x.name}</span><strong>{fmt(x.price)}</strong></li>)}</ul>
              <h4>Фотозоны</h4>
              <ul>{PHOTO_ZONES.map(x => <li key={x.name}><span>{x.name}</span><strong>от {fmt(x.price)}</strong></li>)}</ul>
              <h4>Сервировка и декор</h4>
              <ul>{DECOR.map(x => <li key={x.name}><span>{x.name}</span><strong>{x.from ? 'от ' : ''}{fmt(x.price)}</strong></li>)}</ul>
            </div>
            <div>
              <h4>Шоу</h4>
              <ul>{SHOWS_PRICE.map(x => <li key={x.name}><span>{x.name}</span><strong>{fmt(x.price)}</strong></li>)}</ul>
              <h4>Готовые предложения «анимация + шоу»</h4>
              <ul>{COMBOS.map(x => <li key={x.name}><span>{x.name}</span><strong>{x.from ? 'от ' : ''}{fmt(x.price)}</strong></li>)}</ul>
            </div>
            <div>
              <h4>Мастер-классы</h4>
              <ul>{MASTER.map(x => <li key={x.name}><span>{x.name}{x.note ? ` (${x.note})` : ''}</span><strong>{x.from ? 'от ' : ''}{fmt(x.price)}{x.unit || ''}</strong></li>)}</ul>
              <h4>Дополнительно</h4>
              <ul>{EXTRAS.map(x => <li key={x.name}><span>{x.name}</span><strong>{fmt(x.price)}{x.unit || ''}</strong></li>)}</ul>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

// ===== Reviews =====
function ReviewsSection() {
  return (
    <section id="reviews" className="section reviews-section" data-screen-label="Reviews">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Отзывы родителей</div>
            <h2 className="display">5 / 5 на Яндексе. <br/>И каждая оценка — заслуженная</h2>
          </div>
          <div className="section-head__meta">
            Мы просим всех гостей оставить честный отзыв — даже отрицательный.
            Каждое замечание становится правкой в нашем чек-листе.
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="review reveal" style={{transitionDelay: `${i * 80}ms`}}>
              <div className="review__top">
                <div className="review__stars" aria-label={`${r.rating} из 5`}>
                  {[...Array(5)].map((_, k) => <Icon key={k} name="star" size={16} color="#F5BE2A"/>)}
                </div>
                <span className="review__date">{r.date}</span>
              </div>
              <p className="review__text">{r.text}</p>
              <footer className="review__foot">
                <div className="review__author">
                  <strong>{r.name}</strong>
                  <span>{r.child}</span>
                </div>
                <span className="review__src">{r.src}</span>
              </footer>
            </div>
          ))}
        </div>
        <div className="reviews-cta">
          <a href="https://yandex.com/maps/-/CPwFf-kl" target="_blank" rel="noopener" className="btn btn--ghost">
            Все отзывы на Яндекс.Картах →
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== FAQ =====
function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section faq-section" data-screen-label="FAQ">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="h-eyebrow">Частые вопросы</div>
            <h2 className="display">Спрашивали — отвечаем</h2>
          </div>
          <div className="section-head__meta">
            Не нашли ответа? Напишите нам в мессенджер — отвечаем за минуты.
          </div>
        </div>
        <div className="faq-list">
          {FAQ.map((item, i) => (
            <button key={i} onClick={() => setOpen(open === i ? -1 : i)} className={`faq-item ${open === i ? 'is-open' : ''}`}>
              <div className="faq-item__q">
                <span>{item.q}</span>
                <span className="faq-item__plus">{open === i ? '−' : '+'}</span>
              </div>
              <div className="faq-item__a"><div>{item.a}</div></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Format raw phone digits as "+7 (XXX) XXX-XX-XX"
function formatPhone(raw) {
  let d = (raw || '').replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7')) d = '7' + d;
  d = d.slice(0, 11);
  const a = d.slice(1, 4), b = d.slice(4, 7), c = d.slice(7, 9), e = d.slice(9, 11);
  let out = '+7';
  if (d.length > 1) out += ' (' + a;
  if (d.length >= 4) out += ')';
  if (d.length >= 5) out += ' ' + b;
  if (d.length >= 8) out += '-' + c;
  if (d.length >= 10) out += '-' + e;
  return out;
}

// ===== Contact / Form =====
// Telegram bot for receiving leads. Token is public (visible in client JS) —
// risk is limited to someone spamming this single chat. Rotate via @BotFather
// → /revoke if abused.
const TG_BOT_TOKEN = '8780426570:AAFsjXVffvcDZa1jdAxb3UDV6h6DmDMkl64';
const TG_CHAT_ID = '354744967';

function ContactSection({ initialPkg }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', pkg: initialPkg || '', comment: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (initialPkg) setForm(f => ({ ...f, pkg: initialPkg }));
  }, [initialPkg]);

  function backupLead(data) {
    try {
      const list = JSON.parse(localStorage.getItem('veselkin_leads') || '[]');
      list.push({ ...data, ts: new Date().toISOString() });
      localStorage.setItem('veselkin_leads', JSON.stringify(list));
    } catch (_) { /* ignore */ }
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    if (sending) return;

    setSending(true);
    setError('');

    const fmtDate = form.date
      ? new Date(form.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'не указана';
    const pageUrl = (typeof window !== 'undefined' && window.location) ? window.location.href : '';

    const text = [
      '🎉 *Новая заявка с сайта Весёлкин*',
      '',
      `👤 *Имя:* ${form.name}`,
      `📞 *Телефон:* ${form.phone}`,
      `📅 *Дата праздника:* ${fmtDate}`,
      `🎁 *Пакет:* ${form.pkg || 'не выбран'}`,
      form.comment ? `💬 *Комментарий:* ${form.comment}` : '',
      '',
      `🕒 Отправлено: ${new Date().toLocaleString('ru-RU')}`,
      pageUrl ? `🔗 ${pageUrl}` : '',
    ].filter(Boolean).join('\n');

    backupLead(form);

    try {
      const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.description || 'Telegram error');
      setSent(true);
    } catch (err) {
      // Even on error the lead is saved to localStorage as a backup.
      setError('Не удалось отправить через сайт. Позвоните, пожалуйста: ' + PHONE);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="book" className="section contact-section" data-screen-label="Contact / Booking">
      <div className="container">
        <div className="contact">
          <div className="contact__intro">
            <div className="h-eyebrow">Заявка</div>
            <h2 className="display contact__title">Оставьте номер — <br/>перезвоним за 15 минут</h2>
            <p className="contact__lead">
              Согласуем дату и условия под ваш бюджет. Если дата свободна — забронируем на ваше имя
              с предоплатой 5000 ₽ (переносится в случае болезни). Если занята — предложим ближайшие альтернативы.
            </p>

            <div className="contact__channels">
              <a href={`tel:${PHONE_TEL}`} className="contact__channel">
                <Icon name="phone" size={22} color="#6B2EBA"/>
                <div>
                  <div className="contact__channel-name">Телефон</div>
                  <strong>{PHONE}</strong>
                </div>
              </a>
              <a href={WA} target="_blank" rel="noopener" className="contact__channel">
                <Icon name="wa" size={22} color="#25D366"/>
                <div>
                  <div className="contact__channel-name">WhatsApp</div>
                  <strong>Написать сейчас</strong>
                </div>
              </a>
              <a href={TG} target="_blank" rel="noopener" className="contact__channel">
                <Icon name="tg" size={22} color="#229ED9"/>
                <div>
                  <div className="contact__channel-name">Telegram</div>
                  <strong>@veselkin_lubertsy</strong>
                </div>
              </a>
              <a href={MAX} target="_blank" rel="noopener" className="contact__channel">
                <span className="contact__channel-max" aria-hidden="true">M</span>
                <div>
                  <div className="contact__channel-name">MAX</div>
                  <strong>Мессенджер</strong>
                </div>
              </a>
              <div className="contact__channel">
                <Icon name="clock" size={22} color="#FF8A3D"/>
                <div>
                  <div className="contact__channel-name">Работаем</div>
                  <strong>{HOURS}</strong>
                </div>
              </div>
            </div>

            <div className="contact__map">
              <a href="https://yandex.com/maps/-/CPwFf-kl" target="_blank" rel="noopener" className="contact__map-link">
                <Icon name="pin" size={22} color="#E04A6B"/>
                <div>
                  <div className="contact__channel-name">Адрес</div>
                  <strong>{ADDRESS}</strong>
                  <div className="contact__map-hint">Открыть на Яндекс.Картах →</div>
                </div>
              </a>
            </div>
          </div>

          <form className="contact__form" onSubmit={submit}>
            {sent ? (
              <div className="contact__sent">
                <Icon name="check" size={48} color="#2BC9D4"/>
                <h3 className="display">Спасибо, {form.name || 'друг'}!</h3>
                <p>Заявка принята. Перезвоним на {form.phone} в течение 15 минут (с 9:00 до 21:00).</p>
                <button type="button" className="btn btn--ghost" onClick={() => { setSent(false); setForm({ name: '', phone: '', date: '', pkg: '', comment: '' }); }}>
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <>
                <div className="contact__form-head">
                  <span className="hand" style={{fontSize: 38, color: '#6B2EBA'}}>заполните</span>
                  <span className="contact__form-sub">это займёт 30 секунд</span>
                </div>

                <div className="field">
                  <label className="field__label">Как вас зовут?</label>
                  <input className="field__input" placeholder="Имя" value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})} required/>
                </div>
                <div className="field">
                  <label className="field__label">Номер телефона</label>
                  <input className="field__input" placeholder="+7 (___) ___-__-__" type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onFocus={e => { if (!form.phone) setForm({...form, phone: '+7 '}); }}
                    onChange={e => setForm({...form, phone: formatPhone(e.target.value)})}
                    required/>
                </div>
                <div className="field">
                  <label className="field__label">Желаемая дата праздника <span className="field__hint">не обязательное поле</span></label>
                  <input className="field__input" type="date" value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}/>
                </div>
                <div className="field">
                  <label className="field__label">Комментарий или пожелания <span className="field__hint">не обязательное поле</span></label>
                  <textarea className="field__input" rows="3" placeholder="Возраст ребёнка, тема квеста, особые пожелания…"
                    value={form.comment} onChange={e => setForm({...form, comment: e.target.value})}/>
                </div>

                <div className="field field--check">
                  <label className="field__check">
                    <input type="checkbox" required defaultChecked={false}/>
                    <span className="field__check-mark" aria-hidden="true"></span>
                    <span className="field__check-text">
                      Я ознакомлен(а) и согласен(на) с <a href="privacy.html" target="_blank" rel="noopener">Политикой конфиденциальности</a> и даю <a href="consent.html" target="_blank" rel="noopener">Согласие на обработку персональных данных</a>.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn--primary btn--lg contact__submit" disabled={sending}>
                  {sending ? 'Отправляем…' : <>Отправить заявку <Icon name="arrow" size={18}/></>}
                </button>
                {error && (
                  <p className="contact__legal" style={{color: '#E04A6B', fontWeight: 600}}>
                    {error}
                  </p>
                )}
                <p className="contact__legal">
                  Мы не передаём номер третьим лицам и не звоним «по холоду». Перезваниваем только по вашей заявке.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="container footer__row">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="assets/mascot-cloud.png" alt="Логотип детского лофта Весёлкин в Люберцах"/>
            <div>
              <div className="footer__name"><Veselkin dark/></div>
              <div className="footer__sub">детский лофт · Люберцы</div>
            </div>
          </div>
          <p className="footer__lead">
            Камерный лофт для семейных праздников. 7 готовых пакетов и почасовая аренда.
            Открыты ежедневно с 9 до 21.
          </p>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Сайт</div>
          <a href="#packages">Пакеты</a>
          <a href="#config">Конструктор</a>
          <a href="#gallery">Лофт</a>
          <a href="#quests">Квесты и шоу</a>
          <a href="#reviews">Отзывы</a>
          <a href="#faq">Вопросы</a>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Контакты</div>
          <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
          <a href={WA} target="_blank" rel="noopener">WhatsApp</a>
          <a href={TG} target="_blank" rel="noopener">Telegram</a>
          <a href={MAX} target="_blank" rel="noopener">MAX</a>
          <span>{ADDRESS}</span>
          <span>{HOURS}</span>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Соцсети</div>
          <a href={TG} target="_blank" rel="noopener">Telegram-канал</a>
          <a href={IG} target="_blank" rel="noopener">Instagram</a>
          <a href={VK} target="_blank" rel="noopener">VK</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Детский лофт «<Veselkin dark/>»</span>
        <div className="footer__legal-links">
          <a href="privacy.html">Политика конфиденциальности</a>
          <a href="consent.html">Согласие на обработку ПДн</a>
        </div>
        <span>Сделано с любовью для маленьких непосед</span>
      </div>
    </footer>
  );
}

Object.assign(window, { ConfigSection, ReviewsSection, FaqSection, ContactSection, Footer });
