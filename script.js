const themeToggle = document.querySelector('.theme-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const sidebar = document.querySelector('.sidebar');
const navLinks = [...document.querySelectorAll('.side-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

mobileMenu?.addEventListener('click', () => {
  const open = sidebar.classList.toggle('mobile-open');
  mobileMenu.setAttribute('aria-expanded', String(open));
  mobileMenu.textContent = open ? '×' : '☰';
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  sidebar.classList.remove('mobile-open');
  mobileMenu?.setAttribute('aria-expanded', 'false');
  if (mobileMenu) mobileMenu.textContent = '☰';
}));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const intro = document.querySelector('.intro');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!intro || ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    intro.style.transform = `translateY(${progress * -22}px)`;
    intro.style.opacity = String(1 - progress * 0.25);
    ticking = false;
  });
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
