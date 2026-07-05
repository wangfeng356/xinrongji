/* ── Hero: lazy-load video + parallax ── */
(function () {
  const hero  = document.getElementById('hero');
  const bg    = hero ? hero.querySelector('.hero-bg') : null;
  if (!hero || !bg) return;

  const video = bg.querySelector('video');

  // ── Lazy load video：不等任何东西，直接开始下载 ──
  function loadVideo() {
    if (!video || video.querySelector('source')) return;
    const src = document.createElement('source');
    src.src = 'hero-video.mp4';
    src.type = 'video/mp4';
    video.appendChild(src);
    video.load();
    video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
    setTimeout(() => video.play().catch(() => {}), 2000);
  }

  // 立即开始，不等待任何事件
  loadVideo();

  // ── Also try on first user interaction (backup) ──
  const tryPlay = () => {
    if (video) video.play().catch(() => {});
  };
  ['click', 'touchstart', 'scroll'].forEach(evt => {
    document.addEventListener(evt, tryPlay, { once: true });
  });

  // ── Parallax ──
  function update() {
    const scrollY = window.scrollY;
    const heroH   = hero.offsetHeight;
    if (scrollY <= heroH) {
      bg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
