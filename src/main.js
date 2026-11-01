import { appConfig } from './config.js';

let currentLightboxIndex = 0;
let lastTriggerElement = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMarqueeShowcase();
  initFeatures();
  initLightbox();
  initDownloadLogic();
  initFaqAccordion();
});

// 1. Navigation & Smooth Scrolling (Desktop & Mobile)
function initNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('mobileDrawerCloseBtn');

  const toggleDrawer = (open) => {
    if (!drawer) return;
    if (open) {
      drawer.classList.add('active');
      mobileBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('active');
      mobileBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  mobileBtn?.addEventListener('click', () => toggleDrawer(true));
  closeBtn?.addEventListener('click', () => toggleDrawer(false));
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) toggleDrawer(false);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        toggleDrawer(false);
        targetEl.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', targetId);
      }
    });
  });
}

// 2. Continuous Horizontally Moving Screen Showcase (8 Genuine Screens)
function initMarqueeShowcase() {
  const track = document.getElementById('marqueeTrack');
  const wrapper = document.getElementById('marqueeWrapper');
  if (!track || !wrapper) return;

  const screens = appConfig.screens;

  const renderCardsHtml = (items) => {
    return items.map((screen, idx) => `
      <div class="screen-card" data-index="${idx}" role="button" tabindex="0" aria-label="View ${screen.title} preview">
        <div class="screen-phone-box">
          <img src="${screen.src}" alt="${screen.title}" class="screen-phone-img" loading="lazy">
        </div>
        <div class="screen-info">
          <div class="screen-top-meta">
            <span class="screen-num">${screen.num}</span>
            <span class="screen-card-badge">${screen.badge}</span>
          </div>
          <div class="screen-card-title">${screen.title}</div>
          <p class="screen-card-caption">${screen.caption}</p>
        </div>
      </div>
    `).join('');
  };

  track.innerHTML = renderCardsHtml(screens) + renderCardsHtml(screens);

  track.querySelectorAll('.screen-card').forEach(card => {
    const handler = (e) => {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      const idx = parseInt(card.dataset.index, 10);
      lastTriggerElement = card;
      openLightbox(idx);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', handler);
  });

  let touchStartX = 0;
  wrapper.addEventListener('touchstart', (e) => {
    wrapper.classList.add('is-paused');
    touchStartX = e.touches[0].pageX;
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    setTimeout(() => {
      if (!document.body.classList.contains('lightbox-active')) {
        wrapper.classList.remove('is-paused');
      }
    }, 1200);
  });
}

// 3. Verified Core Features Grid
function initFeatures() {
  const container = document.getElementById('featuresContainer');
  if (!container || !appConfig.features) return;

  container.innerHTML = appConfig.features.map(feat => {
    const isPhase2 = feat.statusText.includes('Phase 2');
    return `
      <div class="feature-card">
        <div class="feature-card-top">
          <span class="feature-badge">${feat.badge}</span>
          <span class="feature-status-tag ${isPhase2 ? 'phase-tag' : 'verified-tag'}">
            ${feat.statusText}
          </span>
        </div>
        <h3 class="feature-card-title">${feat.title}</h3>
        <p class="feature-card-desc">${feat.description}</p>
      </div>
    `;
  }).join('');
}

// 4. Lightbox Modal Logic
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const dialog = document.getElementById('lightboxDialog');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  if (!modal) return;

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + appConfig.screens.length) % appConfig.screens.length;
    updateLightboxContent();
  });
  nextBtn?.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % appConfig.screens.length;
    updateLightboxContent();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentLightboxIndex = (currentLightboxIndex - 1 + appConfig.screens.length) % appConfig.screens.length;
      updateLightboxContent();
    }
    if (e.key === 'ArrowRight') {
      currentLightboxIndex = (currentLightboxIndex + 1) % appConfig.screens.length;
      updateLightboxContent();
    }
  });

  let swipeStartX = 0;
  let swipeStartY = 0;
  dialog?.addEventListener('touchstart', (e) => {
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
  }, { passive: true });

  dialog?.addEventListener('touchend', (e) => {
    const diffX = swipeStartX - e.changedTouches[0].clientX;
    const diffY = swipeStartY - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        currentLightboxIndex = (currentLightboxIndex + 1) % appConfig.screens.length;
      } else {
        currentLightboxIndex = (currentLightboxIndex - 1 + appConfig.screens.length) % appConfig.screens.length;
      }
      updateLightboxContent();
    }
  });
}

function openLightbox(index) {
  const modal = document.getElementById('lightboxModal');
  const wrapper = document.getElementById('marqueeWrapper');
  if (!modal) return;

  currentLightboxIndex = index;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.classList.add('lightbox-active');
  document.body.style.overflow = 'hidden';
  wrapper?.classList.add('is-paused');

  document.getElementById('lightboxCloseBtn')?.focus();
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  const wrapper = document.getElementById('marqueeWrapper');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.classList.remove('lightbox-active');
  document.body.style.overflow = '';
  wrapper?.classList.remove('is-paused');

  lastTriggerElement?.focus();
}

function updateLightboxContent() {
  const screen = appConfig.screens[currentLightboxIndex];
  if (!screen) return;

  const img = document.getElementById('lightboxPhoneImg');
  const num = document.getElementById('lightboxNum');
  const badge = document.getElementById('lightboxBadge');
  const title = document.getElementById('lightboxTitle');
  const caption = document.getElementById('lightboxCaption');
  const statusNote = document.getElementById('lightboxStatusNote');

  if (img) img.src = screen.src;
  if (num) num.textContent = screen.num;
  if (badge) badge.textContent = screen.badge;
  if (title) title.textContent = screen.title;
  if (caption) caption.textContent = screen.caption;
  if (statusNote) {
    statusNote.innerHTML = `<strong>Implementation Status:</strong> ${screen.statusText} &bull; Native Kotlin/Compose Android Build (<code>${appConfig.packageName}</code>)`;
  }
}

// 5. Clean, Direct APK Download Functionality
function initDownloadLogic() {
  const mainBtn = document.getElementById('mainDownloadBtn');
  const mainBtnText = document.getElementById('mainDownloadBtnText');
  const heroBtn = document.getElementById('heroDownloadBtn');
  const heroBtnText = document.getElementById('heroDownloadBtnText');
  const headerBtn = document.getElementById('headerDownloadBtn');
  const statusContainer = document.getElementById('releaseStatusContainer');

  const metaVersion = document.getElementById('metaVersion');
  const metaSize = document.getElementById('metaSize');
  const metaMinAndroid = document.getElementById('metaMinAndroid');

  if (metaVersion) metaVersion.textContent = `v${appConfig.version}`;
  if (metaSize) metaSize.textContent = appConfig.apkSizeFormatted;
  if (metaMinAndroid) metaMinAndroid.textContent = appConfig.minAndroid;

  const isReady = appConfig.download?.isReleaseReady;
  const apkUrl = appConfig.download?.apkUrl;
  const filename = appConfig.download?.filename || 'Netchat.apk';

  if (isReady && apkUrl) {
    // Configure direct download links
    if (mainBtn) {
      mainBtn.href = apkUrl;
      mainBtn.setAttribute('download', filename);
    }
    if (mainBtnText) {
      mainBtnText.textContent = `Download APK (${appConfig.apkSizeFormatted})`;
    }
    if (heroBtn) {
      heroBtn.href = apkUrl;
      heroBtn.setAttribute('download', filename);
    }
    if (heroBtnText) {
      heroBtnText.textContent = 'Download APK';
    }
    if (headerBtn) {
      headerBtn.href = apkUrl;
      headerBtn.setAttribute('download', filename);
    }
  } else {
    // Clearly report that the official release APK is not ready
    if (statusContainer) {
      statusContainer.innerHTML = `
        <div class="release-status-banner">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>${appConfig.download?.notReadyMessage || 'Official release APK is currently being prepared.'}</div>
        </div>
      `;
    }
    if (mainBtn) {
      mainBtn.classList.add('disabled');
      mainBtn.href = '#';
      mainBtn.removeAttribute('download');
      mainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(appConfig.download?.notReadyMessage || 'Official release is coming soon.');
      });
    }
    if (mainBtnText) {
      mainBtnText.textContent = 'Release Coming Soon';
    }
  }
}

// 6. FAQ Accordion
function initFaqAccordion() {
  const container = document.getElementById('faqContainer');
  if (!container) return;

  container.innerHTML = appConfig.faqs.map((faq, i) => `
    <div class="faq-item ${i === 0 ? 'active' : ''}">
      <button class="faq-question-btn" aria-expanded="${i === 0}">
        <span>${faq.question}</span>
        <svg class="faq-chevron" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="faq-answer">
        ${faq.answer}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('active');

      container.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        parent.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const text = document.getElementById('toastMsg');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 3200);
}
