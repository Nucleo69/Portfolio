/**
 * Sara Patil - Personal Portfolio JavaScript
 * Minimalist Editorial Architecture • Multilingual Engine • Lightbox & Portrait Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Multilingual Translation Engine
  const langButtons = document.querySelectorAll('.lang-btn-item');

  function setLanguage(lang) {
    if (!translations[lang]) return;

    // Replace data-i18n text
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Replace input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Active button state
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('sara_editorial_lang', lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem('sara_editorial_lang') || 'en';
  setLanguage(savedLang);

  // 2. Editorial Portrait Toggle (Monochrome vs Natural Color)
  const portraitFrame = document.getElementById('editorialPortraitFrame');
  const togglePortraitBtn = document.getElementById('togglePortraitBtn');

  if (portraitFrame && togglePortraitBtn) {
    togglePortraitBtn.addEventListener('click', () => {
      portraitFrame.classList.toggle('show-color');
      const isColor = portraitFrame.classList.contains('show-color');
      togglePortraitBtn.textContent = isColor ? 'View Monochrome' : 'View Natural Color';
    });
  }

  // 3. Navigation Scroll Effect & Active Section Tracking
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 110;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });

  // 4. Mobile Menu
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navList = document.getElementById('navList');

  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      mobileToggle.textContent = navList.classList.contains('open') ? 'Close' : 'Menu';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        mobileToggle.textContent = 'Menu';
      });
    });
  }

  // 5. Interactive Lightbox Modal
  const lightboxModal = document.getElementById('editorialLightbox');
  const lightboxImg = document.getElementById('lightboxImageTarget');
  const lightboxTitle = document.getElementById('lightboxCaptionTitle');
  const lightboxSub = document.getElementById('lightboxCaptionSub');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openLightbox(src, title, sub) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxTitle.textContent = title || '';
    lightboxSub.textContent = sub || '';
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-img-src') || el.querySelector('img')?.src;
      const title = el.getAttribute('data-img-title') || el.querySelector('.gallery-hover-title, .mosaic-hover-plate span, .vignette-title')?.textContent;
      const sub = el.getAttribute('data-img-sub') || el.querySelector('.gallery-hover-medium, .vignette-desc')?.textContent;
      if (src) {
        openLightbox(src, title, sub);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // 6. Contact Form & Email Dispatch
  const contactForm = document.getElementById('editorialContactForm');
  const formFeedback = document.getElementById('formFeedbackPill');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const subject = document.getElementById('contactSubject').value || 'Academic Inquiry / Collaboration';
      const message = document.getElementById('contactMessage').value;

      const mailtoUrl = `mailto:sarapatil2006@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      if (formFeedback) {
        formFeedback.classList.add('active');
        formFeedback.textContent = 'Redirecting to your email client to send to sarapatil2006@gmail.com';
        setTimeout(() => {
          formFeedback.classList.remove('active');
        }, 5000);
      }
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'sarapatil2006@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const prevText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied to Clipboard';
        setTimeout(() => {
          copyEmailBtn.textContent = prevText;
        }, 2200);
      }).catch(() => {
        window.prompt('Copy email address:', email);
      });
    });
  }
});
