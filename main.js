/**
 * main.js — Global behaviour for Naqeebi Autos website.
 * Responsibilities:
 *   1. Hamburger menu toggle
 *   2. Active nav link highlighting
 *   3. Inject floating WhatsApp button
 */

// WhatsApp SVG icon (inlined from assets/icons/whatsapp.svg)
const WHATSAPP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>`;

document.addEventListener('DOMContentLoaded', () => {
  // ─── 1. Hamburger menu toggle ────────────────────────────────────────────────

  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('nav.navbar');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu when any nav link is clicked
    const navLinks = navbar.querySelectorAll('.navbar__links a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── 2. Active nav link highlighting ────────────────────────────────────────

  const pathname = window.location.pathname;

  // Normalise the current path to a filename for comparison
  const currentFile = pathname.endsWith('/')
    ? 'index.html'
    : pathname.split('/').pop() || 'index.html';

  const navAnchors = document.querySelectorAll('.navbar__links a');
  navAnchors.forEach((anchor) => {
    const href = anchor.getAttribute('href') || '';
    const hrefFile = href.split('/').pop() || 'index.html';

    // Map bare "/" and "index.html" to the same home link
    const normHref =
      href === '/' || href === '' || href === './index.html' ? 'index.html' : hrefFile;
    const normCurrent =
      currentFile === '' || pathname === '/' ? 'index.html' : currentFile;

    if (normHref === normCurrent) {
      anchor.classList.add('active');
    }
  });

  // ─── 3. Inject floating WhatsApp button ─────────────────────────────────────

  const whatsappBtn = document.createElement('a');
  whatsappBtn.id = 'whatsapp-float';
  whatsappBtn.href = 'https://wa.me/923275705645';
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  whatsappBtn.title = 'Chat with us on WhatsApp';
  whatsappBtn.innerHTML = WHATSAPP_SVG;

  document.body.appendChild(whatsappBtn);
});
