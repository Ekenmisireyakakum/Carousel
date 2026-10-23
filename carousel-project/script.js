/**
 * script.js – FreshBrand Homepage
 *
 * MARQUEE CAROUSEL
 * ─────────────────
 * The carousel is a continuously scrolling ticker (marquee style).
 * All 4 cards + 4 clones sit in a flex row. A CSS @keyframes
 * animation scrolls the row left by exactly one set-width, then
 * snaps back to 0 — making a seamless infinite loop.
 *
 * JS responsibilities:
 *  1. Measure the set-width at load (and on resize) → set CSS var
 *  2. Pause / resume on hover and when the tab is hidden
 *  3. Nudge forward/back on arrow clicks (smooth translate override)
 *  4. Drag-to-scrub on desktop and touch devices
 *  5. Sync dot indicators to whichever original card is most centred
 *  6. Dot clicks jump to that card
 *  7. Mobile hamburger menu
 *  8. Newsletter form validation
 *  9. Scroll-reveal for below-fold elements
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     MARQUEE SETUP
  ───────────────────────────────────────────── */
  const viewport   = document.getElementById('marqueeViewport');
  const track      = document.getElementById('marqueeTrack');
  const section    = document.querySelector('.hero-carousel');

  // Only the 4 originals (not clones) are used for dot sync
  const origCards  = Array.from(track.querySelectorAll('.mq-card:not(.mq-clone)'));
  const allCards   = Array.from(track.querySelectorAll('.mq-card'));
  const dots       = Array.from(document.querySelectorAll('.dot'));
  const btnPrev    = document.getElementById('arrowPrev');
  const btnNext    = document.getElementById('arrowNext');

  const CARD_GAP   = 20;   // px – must match CSS gap
  const SPEED_PX_S = 90;   // pixels per second for the continuous scroll

  let setWidth     = 0;    // pixel width of one full set of 4 cards + gaps
  let paused       = false;
  let activeDot    = 0;

  // ── Measure and apply the set-width CSS variable ──────────────
  function measure() {
    // Width of one full set = sum of the 4 original card widths + their gaps
    let w = 0;
    origCards.forEach(c => { w += c.offsetWidth + CARD_GAP; });
    setWidth = w;

    const duration = setWidth / SPEED_PX_S;

    track.style.setProperty('--mq-set-width', `-${setWidth}px`);
    track.style.setProperty('--mq-duration',  `${duration}s`);
  }

  // ── Pause helpers ─────────────────────────────────────────────
  function pause() {
    if (paused) return;
    paused = true;
    track.classList.add('paused');
  }

  function resume() {
    if (!paused) return;
    paused = false;
    track.classList.remove('paused');
  }

  // ── Read the current visual translateX from the running animation ──
  // Returns the computed X offset in pixels (a negative number).
  function getCurrentX() {
    const matrix = window.getComputedStyle(track).transform;
    if (!matrix || matrix === 'none') return 0;
    // matrix(a,b,c,d,tx,ty) – we want tx
    const parts = matrix.match(/matrix\((.+)\)/);
    if (!parts) return 0;
    return parseFloat(parts[1].split(',')[4]);
  }

  // ── Nudge by one card width in either direction ────────────────
  // Pauses the CSS animation, sets an inline transform, transitions
  // it to the target position, then re-engages the animation from
  // a seamlessly adjusted animation-delay.
  function nudge(direction /* +1 = forward/next, -1 = back/prev */) {
    const cardWidth = origCards[0].offsetWidth + CARD_GAP;
    const startX    = getCurrentX();
    const targetX   = startX + (direction * -cardWidth);

    // Freeze animation, take over with inline transform
    pause();
    track.style.transition = 'none';
    track.style.transform  = `translateX(${startX}px)`;

    // Force reflow, then animate to target
    void track.offsetWidth;
    track.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform  = `translateX(${targetX}px)`;

    track.addEventListener('transitionend', function onEnd() {
      track.removeEventListener('transitionend', onEnd);
      // Re-sync the CSS animation from where we ended up
      // by adjusting animation-delay so it picks up at targetX
      reEngageAnimation(targetX);
    }, { once: true });
  }

  // Re-engage the @keyframes animation from a given X offset
  function reEngageAnimation(fromX) {
    // Normalise: wrap into [0, setWidth] range
    let offset = (-fromX) % setWidth;
    if (offset < 0) offset += setWidth;

    const duration = setWidth / SPEED_PX_S;
    const elapsed  = offset / setWidth * duration; // seconds already "played"

    // Remove inline overrides
    track.style.transition = '';
    track.style.transform  = '';

    // Rewind animation to match the elapsed position
    track.style.animationDelay    = `-${elapsed}s`;
    track.style.animationDuration = `${duration}s`;

    // Small timeout so the new delay is applied before we unpause
    setTimeout(() => { resume(); }, 20);
  }

  // ── Dot sync: find whichever original card is closest to centre ──
  function syncDots() {
    if (!viewport) return;

    const vpRect  = viewport.getBoundingClientRect();
    const vpMid   = vpRect.left + vpRect.width / 2;
    let   nearest = 0;
    let   minDist = Infinity;

    origCards.forEach((card, i) => {
      const r    = card.getBoundingClientRect();
      const mid  = r.left + r.width / 2;
      const dist = Math.abs(mid - vpMid);
      if (dist < minDist) { minDist = dist; nearest = i; }
    });

    if (nearest !== activeDot) {
      dots[activeDot].classList.remove('active');
      dots[activeDot].setAttribute('aria-selected', 'false');
      activeDot = nearest;
      dots[activeDot].classList.add('active');
      dots[activeDot].setAttribute('aria-selected', 'true');
    }
  }

  // ── Jump to a card by index (for dot clicks) ──────────────────
  function jumpTo(index) {
    const targetCard = origCards[index];
    if (!targetCard) return;

    const startX  = getCurrentX();
    const vpRect  = viewport.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();

    // How many px the card's left edge is from the viewport centre
    const cardMid = cardRect.left - vpRect.left + cardRect.width / 2;
    const vpMid   = vpRect.width / 2;
    const delta   = cardMid - vpMid;
    const targetX = startX - delta;

    pause();
    track.style.transition = 'none';
    track.style.transform  = `translateX(${startX}px)`;
    void track.offsetWidth;
    track.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform  = `translateX(${targetX}px)`;

    track.addEventListener('transitionend', function onEnd() {
      track.removeEventListener('transitionend', onEnd);
      reEngageAnimation(targetX);
    }, { once: true });
  }

  // ── Wire up arrows ────────────────────────────────────────────
  btnNext.addEventListener('click', () => nudge(+1));
  btnPrev.addEventListener('click', () => nudge(-1));

  // ── Wire up dots ──────────────────────────────────────────────
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => jumpTo(parseInt(dot.dataset.target, 10)));
  });

  // ── Pause on hover / focus (desktop) ──────────────────────────
  section.addEventListener('mouseenter', pause);
  section.addEventListener('mouseleave', resume);

  // ── Pause when the tab is hidden ──────────────────────────────
  document.addEventListener('visibilitychange', () => {
    document.hidden ? pause() : resume();
  });

  // ── Sync dots on every animation frame ────────────────────────
  let rafId;
  function tick() {
    syncDots();
    rafId = requestAnimationFrame(tick);
  }
  tick();

  // ── Keyboard (left / right arrow) ─────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nudge(+1);
    if (e.key === 'ArrowLeft')  nudge(-1);
  });

  /* ─────────────────────────────────────────────
     DRAG-TO-SCRUB  (mouse + touch)
  ───────────────────────────────────────────── */
  let isDragging   = false;
  let dragStartX   = 0;
  let dragOriginX  = 0;  // the translateX at drag start

  function onDragStart(clientX) {
    isDragging  = true;
    dragStartX  = clientX;
    dragOriginX = getCurrentX();
    pause();
    track.style.transition = 'none';
    track.style.transform  = `translateX(${dragOriginX}px)`;
    section.style.cursor   = 'grabbing';
  }

  function onDragMove(clientX) {
    if (!isDragging) return;
    const delta = clientX - dragStartX;
    track.style.transform = `translateX(${dragOriginX + delta}px)`;
  }

  function onDragEnd(clientX) {
    if (!isDragging) return;
    isDragging = false;
    section.style.cursor = '';

    const delta   = clientX - dragStartX;
    const finalX  = dragOriginX + delta;

    // Snap to nearest card
    const cardW   = origCards[0].offsetWidth + CARD_GAP;
    const snapped = Math.round(finalX / cardW) * cardW;

    track.style.transition = 'transform 0.3s ease';
    track.style.transform  = `translateX(${snapped}px)`;

    track.addEventListener('transitionend', function onEnd() {
      track.removeEventListener('transitionend', onEnd);
      reEngageAnimation(snapped);
    }, { once: true });
  }

  // Mouse
  section.addEventListener('mousedown',  (e) => { e.preventDefault(); onDragStart(e.clientX); });
  window .addEventListener('mousemove',  (e) => { if (isDragging) onDragMove(e.clientX); });
  window .addEventListener('mouseup',    (e) => { if (isDragging) onDragEnd(e.clientX); });

  // Touch
  section.addEventListener('touchstart', (e) => { onDragStart(e.touches[0].clientX); },         { passive: true });
  section.addEventListener('touchmove',  (e) => { if (isDragging) onDragMove(e.touches[0].clientX); }, { passive: true });
  section.addEventListener('touchend',   (e) => { onDragEnd(e.changedTouches[0].clientX); },    { passive: true });

  /* ─────────────────────────────────────────────
     INIT + RESIZE
  ───────────────────────────────────────────── */
  measure();

  // Re-measure on resize (card widths are responsive)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      pause();
      track.style.transform  = '';
      track.style.transition = '';
      track.style.animationDelay = '';
      measure();
      resume();
    }, 200);
  });

  /* ─────────────────────────────────────────────
     MOBILE HAMBURGER MENU
  ───────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      const [s0, s1, s2] = navToggle.querySelectorAll('span');
      if (isOpen) {
        s0.style.transform = 'translateY(7.5px) rotate(45deg)';
        s1.style.opacity   = '0';
        s2.style.transform = 'translateY(-7.5px) rotate(-45deg)';
      } else {
        s0.style.transform = s1.style.opacity = s2.style.transform = '';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const [s0, s1, s2] = navToggle.querySelectorAll('span');
        s0.style.transform = s1.style.opacity = s2.style.transform = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const [s0, s1, s2] = navToggle.querySelectorAll('span');
        s0.style.transform = s1.style.opacity = s2.style.transform = '';
      }
    });
  }

  /* ─────────────────────────────────────────────
     NEWSLETTER FORM
  ───────────────────────────────────────────── */
  const form = document.querySelector('.newsletter-form');
  const btn  = form && form.querySelector('.newsletter-btn');

  if (form && btn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((input?.value || '').trim())) {
        if (input) {
          input.style.outline = '2px solid #ef4723';
          input.focus();
          setTimeout(() => { input.style.outline = ''; }, 2500);
        }
        return;
      }
      btn.textContent        = '✓ Subscribed!';
      btn.style.background   = '#27ae60';
      btn.disabled           = true;
      if (input) input.value = '';
      setTimeout(() => {
        btn.textContent      = 'Subscribe';
        btn.style.background = '';
        btn.disabled         = false;
      }, 4000);
    });
  }

  /* ─────────────────────────────────────────────
     SCROLL-REVEAL
  ───────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.product-card, .stat-item, .mag-card, .quick-link-tile'
  );

  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach((el, i) => {
      el.style.cssText += `opacity:0;transform:translateY(22px);
        transition:opacity .5s ease ${i * 0.07}s,transform .5s ease ${i * 0.07}s;`;
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  }

})();
