/* ============================================================
   script.js — Private Car Tours Da Nang
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR SCROLL ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── 2. HAMBURGER MENU ─────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    })
  );

  // ── 3. HERO SLIDESHOW ─────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  let heroTimer = null;
  function advanceSlide() {
    if (slides.length <= 1) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  function startSlideshow() {
    if (heroTimer) clearInterval(heroTimer);
    if (slides.length > 1) heroTimer = setInterval(advanceSlide, 5000);
  }
  startSlideshow();
  // Restart slideshow when tab becomes visible again
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (heroTimer) clearInterval(heroTimer); }
    else startSlideshow();
  });

  // ── 4. COUNTER ANIMATION ──────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const step = target / (1800 / 16);
    let current = 0;
    const t = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('vi-VN');
      if (current >= target) clearInterval(t);
    }, 16);
  }
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = '1';
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 }).observe
    ? document.querySelectorAll('[data-target]').forEach(el =>
        new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting && !e.target.dataset.animated) {
              e.target.dataset.animated = '1';
              animateCounter(e.target);
            }
          });
        }, { threshold: 0.5 }).observe(el)
      )
    : null;

  // ── 5. POPUP MODAL ────────────────────────────────────────
  const modal = document.getElementById('contact-modal');
  const openModal  = () => { if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; } };
  const closeModal = () => { if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; } };
  // Open modal — use event delegation for robustness
  document.addEventListener('click', e => {
    const openBtn = e.target.closest('[data-open-modal]');
    if (openBtn) { e.preventDefault(); e.stopPropagation(); openModal(); }
  });
  // Close modal — use event delegation so dynamically-changed content still works
  document.addEventListener('click', e => {
    if (!modal || !modal.classList.contains('open')) return;
    // Close if clicking the close button
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) { e.preventDefault(); e.stopPropagation(); closeModal(); return; }
    // Close if clicking the overlay (not the card)
    if (e.target === modal || e.target.classList.contains('modal-overlay')) { closeModal(); return; }
  });
  // Also support Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });

  // ── 6. FAQ ACCORDION ──────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── 7. TOUR ACCORDION ─────────────────────────────────────
  // Get current language for button text
  function getTourBtnText(isOpen) {
    const lang = document.documentElement.lang || 'vi';
    if (isOpen) return lang === 'en' ? '📋 Hide Itinerary ▲' : '📋 Ẩn lịch trình ▲';
    return lang === 'en' ? '📋 View Itinerary ▼' : '📋 Xem lịch trình ▼';
  }
  document.querySelectorAll('.tour-accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.tour-card');
      const acc = card.querySelector('.tour-accordion');
      const isOpen = acc.classList.contains('open');
      // Close all other accordions first
      document.querySelectorAll('.tour-accordion.open').forEach(a => {
        a.classList.remove('open');
        a.style.maxHeight = '0';
      });
      document.querySelectorAll('.tour-accordion-toggle').forEach(b => {
        b.textContent = getTourBtnText(false);
      });
      // Toggle current
      if (!isOpen) {
        acc.classList.add('open');
        acc.style.maxHeight = acc.scrollHeight + 'px';
        btn.textContent = getTourBtnText(true);
      } else {
        acc.classList.remove('open');
        acc.style.maxHeight = '0';
        btn.textContent = getTourBtnText(false);
      }
    });
  });

  // ── 8. REVIEWS SLIDER ─────────────────────────────────────
  const track = document.querySelector('.reviews-track');
  const dots = document.querySelectorAll('.slider-dot');
  let sliderIdx = 0;
  const total = track ? track.children.length : 0;
  function goTo(idx) {
    sliderIdx = (idx + total) % total;
    track.style.transform = `translateX(-${sliderIdx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === sliderIdx));
  }
  document.getElementById('slider-prev')?.addEventListener('click', () => goTo(sliderIdx - 1));
  document.getElementById('slider-next')?.addEventListener('click', () => goTo(sliderIdx + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  if (total > 0) setInterval(() => goTo(sliderIdx + 1), 5000);

  // ── 9. CONTACT FORM ───────────────────────────────────────
  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.disabled = true; btn.textContent = '...';
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'block';
      e.target.reset(); btn.style.display = 'none';
    }, 1000);
  });

  // ── 10. FADE-UP ───────────────────────────────────────────
  const fuObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fuObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => fuObs.observe(el));

  // ── 11. SMOOTH SCROLL ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── 12. LANGUAGE SWITCHER ─────────────────────────────────
  /**
   * setElText: safely updates only the TEXT NODES of an element,
   * leaving child elements (icons, spans) intact.
   */
  function setElText(el, text) {
    // For elements with only text (no child tags), just use textContent
    if (el.children.length === 0) {
      el.textContent = text;
      return;
    }
    // For elements with icons/child elements, update the last text node
    for (let i = el.childNodes.length - 1; i >= 0; i--) {
      if (el.childNodes[i].nodeType === Node.TEXT_NODE) {
        el.childNodes[i].textContent = ' ' + text;
        return;
      }
    }
    // Fallback: append text node
    el.appendChild(document.createTextNode(' ' + text));
  }

  function applyLanguage(lang) {
    if (!window.I18N_MAP || !window.I18N_MAP[lang]) return;
    const map = window.I18N_MAP[lang];

    Object.entries(map).forEach(([selector, text]) => {
      if (text === null) return; // skip nulls
      try {
        document.querySelectorAll(selector).forEach(el => {
          el.textContent = text;
        });
      } catch (e) {
        // invalid selector — skip silently
      }
    });

    // Handle nav CTA buttons (have both icon <i> and text <span>)
    const ctaLabel = lang === 'en' ? 'Contact Now' : 'Tư vấn ngay';
    document.querySelectorAll('[data-vi], [data-en]').forEach(el => {
      const val = lang === 'en' ? el.dataset.en : el.dataset.vi;
      if (val !== undefined) el.textContent = val;
    });

    // Mobile sticky bar text nodes
    const stickyLabels = lang === 'en'
      ? ['Call Now', 'Zalo', 'WhatsApp', 'Messenger']
      : ['Gọi ngay', 'Zalo', 'WhatsApp', 'Messenger'];
    document.querySelectorAll('.sticky-bar-item').forEach((item, i) => {
      // Update only the trailing text node (after the icon span)
      const nodes = [...item.childNodes].filter(n => n.nodeType === Node.TEXT_NODE);
      if (nodes.length) nodes[nodes.length - 1].textContent = stickyLabels[i] || '';
    });

    // Hero CTA buttons — update text inside, preserve emojis
    const heroCta1 = document.querySelector('.hero-ctas .btn:nth-child(1)');
    const heroCta2 = document.querySelector('.hero-ctas .btn:nth-child(2)');
    if (heroCta1) heroCta1.textContent = lang === 'en' ? '💬 Free Consultation Now' : '💬 Tư vấn miễn phí ngay';
    if (heroCta2) heroCta2.textContent = lang === 'en' ? '📋 View Tours' : '📋 Xem các tour';

    // Tour accordion toggle buttons text
    document.querySelectorAll('.tour-accordion-toggle').forEach(btn => {
      const isOpen = btn.closest('.tour-card')?.querySelector('.tour-accordion.open');
      btn.textContent = isOpen
        ? (lang === 'en' ? '📋 Hide Itinerary ▲' : '📋 Ẩn lịch trình ▲')
        : (lang === 'en' ? '📋 View Itinerary ▼' : '📋 Xem lịch trình ▼');
    });
    document.querySelectorAll('.tour-actions .btn-gold').forEach(btn => {
      btn.textContent = lang === 'en' ? '💬 Inquire Now' : '💬 Hỏi ngay';
    });
    document.querySelectorAll('.tour-accordion-inner h4').forEach(h4 => {
      h4.textContent = lang === 'en' ? 'SAMPLE ITINERARY' : 'LỊCH TRÌNH THAM KHẢO';
    });

    // Custom tour card CTA
    const t6cta = document.querySelector('.tour-card:nth-child(6) .btn-gold');
    if (t6cta) t6cta.textContent = lang === 'en' ? '💬 Design My Private Tour' : '💬 Tư vấn thiết kế tour riêng';

    // Blog CTA
    const blogCta = document.querySelector('.blog-cta .btn-gold');
    if (blogCta) blogCta.textContent = lang === 'en' ? '📖 View All Articles' : '📖 Xem tất cả bài viết';

    // Footer CTA
    const footerCtaLead = document.querySelector('#footer .footer-col:last-child p[style]');
    if (footerCtaLead) footerCtaLead.textContent = lang === 'en' ? 'Free consultation:' : 'Tư vấn miễn phí ngay:';
    const footerCtaBtn = document.querySelector('#footer .footer-col:last-child .btn-gold');
    if (footerCtaBtn) footerCtaBtn.textContent = lang === 'en' ? '💬 Contact Now' : '💬 Tư vấn ngay';

    // Channel button sub-labels
    const msgSub = document.querySelector('.ch-messenger .ch-label');
    if (msgSub) msgSub.textContent = lang === 'en' ? 'Reply instantly' : 'Phản hồi ngay';

    // Sync all lang-btn states
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Tour card meta (duration, type) — each tour has 2 meta spans
    const tourMetas = {
      en: [
        ['📅 Full day',   '🚗 Private car'],
        ['📅 Full day',   '🚠 Cable car'],
        ['📅 Full day',   '🚗 Private car'],
        ['📅 4–6 hours',  '🚗 Private car'],
        ['📅 Full day',   '🚗 Private car'],
      ],
      vi: [
        ['📅 1 ngày',     '🚗 Xe riêng'],
        ['📅 1 ngày',     '🚠 Cáp treo'],
        ['📅 1 ngày',     '🚗 Xe riêng'],
        ['📅 4–6 tiếng',  '🚗 Xe riêng'],
        ['📅 1 ngày',     '🚗 Xe riêng'],
      ],
    };
    document.querySelectorAll('.tour-card').forEach((card, i) => {
      const metaSpans = card.querySelectorAll('.tour-meta span');
      const metas = (tourMetas[lang] || tourMetas.vi)[i];
      if (metas) metaSpans.forEach((sp, j) => { if (metas[j]) sp.textContent = metas[j]; });
    });

    // Tour price labels
    document.querySelectorAll('.tour-price').forEach(el => {
      const span = el.querySelector('span');
      if (span) span.textContent = lang === 'en' ? 'Contact for pricing' : 'Liên hệ báo giá';
      const textNode = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.textContent = lang === 'en' ? 'From: ' : 'Giá từ: ';
    });

    // Custom tour 6 meta
    const t6metas = document.querySelector('.tour-card:nth-child(6) .tour-meta');
    if (t6metas) {
      const spans = t6metas.querySelectorAll('span');
      if (spans[0]) spans[0].textContent = lang === 'en' ? '📅 1–5 days' : '📅 1–5 ngày';
      if (spans[1]) spans[1].textContent = lang === 'en' ? '🎯 Personalized' : '🎯 Cá nhân hóa';
    }
    const t6desc = document.querySelector('.tour-card:nth-child(6) .tour-body > p');
    if (t6desc) t6desc.textContent = lang === 'en'
      ? "No tour fits your schedule? Let us design a private itinerary based on your days, budget and interests — completely unique!"
      : "Không có lịch trình nào phù hợp? Hãy để chúng tôi thiết kế tour riêng dựa trên số ngày, ngân sách và sở thích của bạn — độc nhất vô nhị!";

    // Contact form submit button
    const formSubmit = document.querySelector('.form-submit');
    if (formSubmit) formSubmit.textContent = lang === 'en' ? '📨 Send Inquiry' : '📨 Gửi yêu cầu tư vấn';

    // Form select default option
    const selectDefault = document.querySelector('#contact-form select option:first-child');
    if (selectDefault) selectDefault.textContent = lang === 'en' ? '-- Select a tour --' : '-- Chọn tour --';

    // Input placeholders
    const placeholders = {
      en: { name: 'Nguyen Van A', phone: '+84 ...', notes: 'Special requests, pickup point...' },
      vi: { name: 'Nguyễn Văn A', phone: '+84 ...', notes: 'Yêu cầu đặc biệt, điểm đón, ...' },
    };
    const ph = lang === 'en' ? placeholders.en : placeholders.vi;
    const nameInput  = document.querySelector('#contact-form input[type="text"]');
    const notesInput = document.querySelector('#contact-form textarea');
    if (nameInput)  nameInput.placeholder  = ph.name;
    if (notesInput) notesInput.placeholder = ph.notes;

    document.documentElement.lang = lang;
    localStorage.setItem('pct-lang', lang);
  }

  // Expose for i18n.js
  window.applyLanguage = applyLanguage;

  // Bind buttons
  document.querySelectorAll('.lang-btn').forEach(btn =>
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang))
  );

  // Restore saved preference
  const saved = localStorage.getItem('pct-lang');
  if (saved && saved !== 'vi') applyLanguage(saved);
  // ── 13. PHOTO GALLERY LIGHTBOX ────────────────────────────
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const galleryItems = () => [...document.querySelectorAll('.gallery-item')];
  let currentGalleryIdx = 0;

  function openLightbox(idx) {
    const items = galleryItems();
    if (!items.length) return;
    currentGalleryIdx = idx;
    const img = items[idx].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = `${idx + 1} / ${items.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function navigateLightbox(dir) {
    const items = galleryItems();
    currentGalleryIdx = (currentGalleryIdx + dir + items.length) % items.length;
    const img = items[currentGalleryIdx].querySelector('img');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCounter.textContent = `${currentGalleryIdx + 1} / ${items.length}`;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  // Attach to gallery items
  document.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const idx = parseInt(item.dataset.index, 10);
      openLightbox(isNaN(idx) ? 0 : idx);
    }
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => navigateLightbox(1));

  // Close on backdrop click
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'Escape')     closeLightbox();
  });

  // Smooth img transition
  if (lightboxImg) lightboxImg.style.transition = 'opacity 0.15s ease';

});
