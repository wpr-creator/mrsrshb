import './style.css';
import { gsap } from 'gsap';
import { Howl } from 'howler';

// ── SOUNDS (Kenney UI sounds) ─────────────────────────
const sndClick = new Howl({ src: ['assets/kenney-ui/Sounds/click-a.ogg'], volume: 0.5 });
const sndHover = new Howl({ src: ['assets/kenney-ui/Sounds/tap-b.ogg'],   volume: 0.25 });
const sndSwitch= new Howl({ src: ['assets/kenney-ui/Sounds/switch-a.ogg'],volume: 0.3 });

// ── STAR BUTTON PATHS (Kenney UI) ─────────────────────
const STAR_FILLED  = 'assets/kenney-ui/PNG/Yellow/Default/star.png';
const STAR_OUTLINE = 'assets/kenney-ui/PNG/Grey/Default/star_outline.png';

// ── GAME CARDS DATA ───────────────────────────────────
const CARDS = [
  {
    id: 'portal',
    href: 'portalpark.html',
    theme: 'card-portal',
    icon: '🚪',
    title: 'Portal Park',
    desc: 'Seven worlds, seven doors. Coins, badges, and a new challenge every run.',
    btn: 'Enter Portal Park ▶',
    saveKey: 'portal_park_v4',
    badgeCheck: d => Object.keys(d?.badges || {}).length,
  },
  {
    id: 'math',
    href: 'pokemonmath.html',
    theme: 'card-math',
    icon: '⚡',
    title: 'Pokémon Math Quest',
    desc: 'Answer right, earn HP, evolve your team through nine math zones.',
    btn: 'Start Math Quest ▶',
    saveKey: 'pokemathquest_v3',
    badgeCheck: d => Object.keys(d?.badges || {}).length,
  },
  {
    id: 'word',
    href: 'wordquest.html',
    theme: 'card-word',
    icon: '📚',
    title: 'Word Quest',
    desc: 'Nouns, verbs, synonyms, sentences — twelve kingdoms, one hero.',
    btn: 'Begin Word Quest ▶',
    saveKey: 'wordquest_stars_v2',
    badgeCheck: d => Object.values(d || {}).filter(Boolean).length,
  },
];

// ── READ PROGRESS from localStorage ──────────────────
function getProgress(card) {
  try {
    const raw = localStorage.getItem(card.saveKey);
    if (!raw) return 0;
    const d = JSON.parse(raw);
    return card.badgeCheck(d);
  } catch { return 0; }
}

// ── BUILD STARFIELD ───────────────────────────────────
function buildStars() {
  const container = document.createElement('div');
  container.id = 'starfield';
  document.body.prepend(container);

  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      opacity:${Math.random()*0.6+0.1};
    `;
    container.appendChild(s);
    // gsap twinkle
    gsap.to(s, {
      opacity: Math.random() * 0.4 + 0.05,
      duration: Math.random() * 3 + 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 4,
    });
  }
  // slow drift on whole field
  gsap.to(container, {
    backgroundPositionX: '+=30px',
    duration: 60,
    repeat: -1,
    ease: 'none',
  });
}

// ── BUILD HERO ────────────────────────────────────────
function buildHero() {
  const section = document.createElement('section');
  section.className = 'hero-section';

  section.innerHTML = `
    <div class="door-glow"></div>
    <div class="door-icon" id="heroDoor"></div>
    <div class="hero-eyebrow">Welcome to</div>
    <h1 class="hero-title">Mrs. Rogers'<br><span>Purple Door</span></h1>
    <p class="hero-sub">Pick your game and see where it takes you.</p>
    <div class="star-divider" aria-hidden="true">
      <span>✦</span><span>✧</span><span>✦</span>
    </div>
  `;
  return section;
}

// ── BUILD ONE CARD ────────────────────────────────────
function buildCard(card) {
  const progress = getProgress(card);
  const hasProgress = progress > 0;

  const a = document.createElement('a');
  a.className = `game-card ${card.theme}`;
  a.href = card.href;

  // dot decorations in art strip
  const dots = [
    { size: 60, top: '10%', left: '5%',  delay: 0 },
    { size: 40, top: '60%', left: '80%', delay: 0.5 },
    { size: 25, top: '20%', left: '70%', delay: 1 },
    { size: 50, top: '70%', left: '20%', delay: 1.5 },
  ].map(d =>
    `<div class="card-art-dot" style="
      width:${d.size}px;height:${d.size}px;
      top:${d.top};left:${d.left};
      animation-delay:${d.delay}s;
    "></div>`
  ).join('');

  // star badge if they have progress
  const badge = hasProgress
    ? `<div class="card-badge"><img src="${STAR_FILLED}" alt="${progress} badge${progress!==1?'s':''} earned"/></div>`
    : '';

  a.innerHTML = `
    ${badge}
    <div class="card-art">
      ${dots}
      <div class="card-art-icon">${card.icon}</div>
    </div>
    <div class="card-body">
      <div class="card-title">${card.title}</div>
      <p class="card-desc">${card.desc}</p>
      <span class="card-btn">${card.btn}</span>
    </div>
  `;

  // ripple on click
  a.addEventListener('click', e => {
    sndClick.play();
    const btn = a.querySelector('.card-btn');
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top  - size/2}px;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  a.addEventListener('mouseenter', () => sndHover.play());

  return a;
}

// ── BUILD PAGE ────────────────────────────────────────
function buildPage() {
  const app = document.getElementById('app');

  // hero
  const hero = buildHero();
  app.appendChild(hero);

  // cards grid
  const grid = document.createElement('section');
  grid.className = 'cards-section';
  grid.setAttribute('aria-label', 'Games');
  CARDS.forEach(card => grid.appendChild(buildCard(card)));
  app.appendChild(grid);

  // footer
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.textContent = 'Choose your challenge. Play your best round.';
  app.appendChild(footer);
}

// ── ENTRANCE ANIMATIONS ───────────────────────────────
function animateIn() {
  // door bounces in
  gsap.from('#heroDoor', {
    y: -60, opacity: 0, scale: 0.6,
    duration: 0.8, ease: 'back.out(1.7)', delay: 0.1,
  });

  // hero text slides up
  gsap.from('.hero-eyebrow, .hero-title, .hero-sub, .star-divider', {
    y: 30, opacity: 0,
    duration: 0.6, ease: 'power2.out',
    stagger: 0.12, delay: 0.4,
  });

  // cards stagger in
  gsap.from('.game-card', {
    y: 50, opacity: 0, scale: 0.92,
    duration: 0.55, ease: 'back.out(1.4)',
    stagger: 0.15, delay: 0.75,
    onComplete: () => sndSwitch.play(),
  });
}

// ── INIT ──────────────────────────────────────────────
buildStars();
buildPage();
animateIn();
