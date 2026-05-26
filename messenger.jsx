/* global React, WA, TG, MAX, PHONE_TEL */

const { useState, useEffect, useRef } = React;

// Reusable "Message us" button that opens a popover with WhatsApp / Telegram / Max
// Supports two variants: 'accent' (yellow) and 'white'.
function MessengerButton({ label = 'Написать в мессенджер', variant = 'white', size = 'lg' }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const opts = [
    { id: 'wa', name: 'WhatsApp', sub: 'ответим за 15 минут', href: WA, color: '#25D366', icon: (
      <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M19.11 17.32c-.31-.16-1.85-.91-2.13-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.83-1.73-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.62 0 1.55 1.13 3.04 1.29 3.25.16.21 2.22 3.38 5.38 4.74.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.16 1.6 5.97L4 28l6.21-1.58A11.95 11.95 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z"/></svg>
    )},
    { id: 'tg', name: 'Telegram', sub: '@veselkin_zhukovsky', href: TG, color: '#229ED9', icon: (
      <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm5.46 8.16-1.82 8.6c-.14.62-.5.77-1 .48l-2.77-2.04-1.34 1.29c-.15.15-.27.27-.55.27l.2-2.82 5.13-4.64c.22-.2-.05-.31-.34-.11l-6.34 4-2.73-.85c-.59-.18-.6-.59.12-.88l10.66-4.11c.49-.18.92.12.78.81z"/></svg>
    )},
    { id: 'max', name: 'MAX', sub: 'мессенджер', href: MAX, color: '#FF7A2F', icon: (
      <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm-5.5 18V10h2.4l2.6 4.2 2.6-4.2h2.4v12h-2.6v-7.1l-2.4 3.7-2.4-3.7V22h-2.6z"/></svg>
    )},
  ];

  const btnClass = variant === 'accent' ? 'btn btn--accent' : variant === 'primary' ? 'btn btn--primary' : 'btn btn--white';
  const sizeClass = size === 'lg' ? ' btn--lg' : size === 'sm' ? ' btn--sm' : '';

  return (
    <div className="msgr" ref={wrapRef}>
      <button
        type="button"
        className={btnClass + sizeClass}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}>
        {label}
        <span aria-hidden="true" className="msgr__caret" style={{transform: open ? 'rotate(180deg)' : 'rotate(0)'}}>▾</span>
      </button>
      {open && (
        <div className="msgr__pop" role="menu">
          <div className="msgr__pop-title">Куда вам удобнее?</div>
          {opts.map(o => (
            <a key={o.id} href={o.href} target="_blank" rel="noopener" className="msgr__opt" style={{'--c': o.color}}>
              <span className="msgr__opt-icon" style={{background: o.color}}>{o.icon}</span>
              <span className="msgr__opt-text">
                <strong>{o.name}</strong>
                <span>{o.sub}</span>
              </span>
              <span className="msgr__opt-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { MessengerButton });
