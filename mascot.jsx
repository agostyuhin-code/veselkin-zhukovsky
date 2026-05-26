/* global React */
// Animated mascot + floating elements

const { useEffect, useRef, useState } = React;

// Floating balloon SVG element
function Balloon({ color = "#6B2EBA", style = {}, className = "" }) {
  return (
    <svg viewBox="0 0 60 84" style={style} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`bg-${color.replace('#','')}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)"/>
          <stop offset="40%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="32" rx="26" ry="30" fill={color}/>
      <ellipse cx="30" cy="32" rx="26" ry="30" fill={`url(#bg-${color.replace('#','')})`}/>
      <path d="M27 60 L30 64 L33 60 Z" fill={color} opacity="0.85"/>
      <path d="M30 64 Q28 74 31 80 Q33 82 30 84" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6"/>
    </svg>
  );
}

// Confetti piece
function Confetti({ count = 24 }) {
  const pieces = [];
  const colors = ["#6B2EBA", "#2BC9D4", "#F5BE2A", "#FF8A3D", "#E04A6B"];
  for (let i = 0; i < count; i++) {
    const left = (i * 97) % 100;
    const delay = (i * 0.37) % 8;
    const dur = 8 + ((i * 1.3) % 8);
    const color = colors[i % colors.length];
    const size = 6 + ((i * 3) % 8);
    pieces.push(
      <span key={i}
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: '-10vh',
          width: size, height: size * 1.5,
          background: color,
          borderRadius: '2px',
          animation: `confetti-fall ${dur}s linear ${delay}s infinite`,
          opacity: 0.85,
          transform: `rotate(${i * 17}deg)`,
        }}/>
    );
  }
  return <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden'}}>{pieces}</div>;
}

// Eye blink overlay positioned over mascot
function MascotEyelids({ left, top, eyeW, eyeGap }) {
  // Two small dark slits that briefly cover the eyes
  return (
    <>
      <span style={{
        position: 'absolute', left: `${left}%`, top: `${top}%`,
        width: eyeW, height: eyeW * 0.9,
        background: '#3a2517',
        borderRadius: '50%',
        transformOrigin: 'center',
        animation: 'blink 5.5s ease-in-out infinite',
        opacity: 0.96,
      }}/>
      <span style={{
        position: 'absolute', left: `calc(${left}% + ${eyeGap}px)`, top: `${top}%`,
        width: eyeW, height: eyeW * 0.9,
        background: '#3a2517',
        borderRadius: '50%',
        transformOrigin: 'center',
        animation: 'blink 5.5s ease-in-out infinite',
        opacity: 0.96,
      }}/>
    </>
  );
}

// Main mascot (standing version) with parallax + floating balloons accent
function MascotStanding({ size = 480, withBalloons = true, parallax = true }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({x: 0, y: 0});

  useEffect(() => {
    if (!parallax) return;
    function onMove(e) {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      setTilt({x: dx * 12, y: dy * 8});
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [parallax]);

  return (
    <div ref={ref} style={{position: 'relative', width: size, height: size * 0.95}} aria-hidden="true">
      {/* Floating balloons around */}
      {withBalloons && (
        <>
          <div style={{position: 'absolute', left: '-8%', top: '0%', width: size * 0.16,
            animation: 'balloon-sway 5s ease-in-out infinite'}}>
            <Balloon color="#F5BE2A"/>
          </div>
          <div style={{position: 'absolute', right: '-2%', top: '-6%', width: size * 0.13,
            animation: 'balloon-sway-2 6s ease-in-out infinite'}}>
            <Balloon color="#2BC9D4"/>
          </div>
          <div style={{position: 'absolute', right: '12%', top: '-12%', width: size * 0.1,
            animation: 'balloon-sway 7s ease-in-out infinite'}}>
            <Balloon color="#FF8A3D"/>
          </div>
        </>
      )}

      {/* Soft ground shadow */}
      <div style={{
        position: 'absolute', left: '15%', right: '15%', bottom: '-2%',
        height: size * 0.06,
        background: 'radial-gradient(ellipse at center, rgba(30,26,56,0.35), rgba(30,26,56,0) 70%)',
        filter: 'blur(8px)',
      }}/>

      {/* Mascot image with parallax + float */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translate(${tilt.x}px, ${tilt.y}px)`,
        transition: 'transform 0.4s ease-out',
      }}>
        <img src="assets/mascot.png" alt=""
          style={{
            width: '100%', height: '100%', objectFit: 'contain',
            animation: 'float-y-slow 6s ease-in-out infinite',
            filter: 'drop-shadow(0 30px 40px rgba(74,30,132,0.25))',
          }}/>
      </div>
    </div>
  );
}

// Cloud variant (mascot on cloud)
function MascotCloud({ size = 480 }) {
  return (
    <div style={{position: 'relative', width: size, height: size * 0.78}} aria-hidden="true">
      <img src="assets/mascot-cloud.png" alt=""
        style={{
          width: '100%', height: '100%', objectFit: 'contain',
          animation: 'float-y-slow 7s ease-in-out infinite',
          filter: 'drop-shadow(0 26px 36px rgba(43,201,212,0.30))',
        }}/>
    </div>
  );
}

// Sparkle decorative SVG
function Sparkle({ size = 36, color = "#F5BE2A", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" style={style} aria-hidden="true">
      <path d="M18 0 L21 15 L36 18 L21 21 L18 36 L15 21 L0 18 L15 15 Z" fill={color}/>
    </svg>
  );
}

// Use scroll reveal
function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

Object.assign(window, { Balloon, Confetti, MascotStanding, MascotCloud, Sparkle, useRevealOnScroll, Veselkin });

// ===== Веселкин wordmark (multi-color letters with ё) =====
function Veselkin({ caps = false, dark = false }) {
  const letters = caps ? ['В','Е','С','Ё','Л','К','И','Н'] : ['В','е','с','ё','л','к','и','н'];
  const palette = dark
    ? ['#B98BE8','#2BC9D4','#FF8A3D','#FF6F8C','#F5BE2A','#B98BE8','#2BC9D4','#FF8A3D']
    : ['#6B2EBA','#2BC9D4','#FF8A3D','#E04A6B','#4A1E84','#6B2EBA','#2BC9D4','#FF8A3D'];
  return (
    <span className="veselkin" aria-label="Весёлкин">
      {letters.map((l, i) => <span key={i} style={{ color: palette[i] }}>{l}</span>)}
    </span>
  );
}
