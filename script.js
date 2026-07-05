/* ── Hero: lazy-load video + parallax ── */
(function () {
  const hero  = document.getElementById('hero');
  const bg    = hero ? hero.querySelector('.hero-bg') : null;
  if (!hero || !bg) return;

  const video = bg.querySelector('video');

  // ── Lazy load video ──
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
  loadVideo();

  ['click', 'touchstart', 'scroll'].forEach(evt => {
    document.addEventListener(evt, () => video.play().catch(() => {}), { once: true });
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

/* ── Scroll reveal + number counting ── */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Number counting animation
      const counts = entry.target.querySelectorAll('.count');
      counts.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        if (!target || el.dataset.done) return;
        el.dataset.done = '1';
        let current = 0;
        const step = () => {
          current += Math.ceil(target / 20);
          if (current >= target) { el.textContent = target; return; }
          el.textContent = current;
          requestAnimationFrame(step);
        };
        step();
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
