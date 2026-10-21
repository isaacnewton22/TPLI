// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

// Révéler les sections quand elles entrent dans l'écran.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.panel').forEach(panel => observer.observe(panel));
} else {
  document.querySelectorAll('.panel').forEach(panel => panel.classList.add('in-view'));
}

// Le site n'a pas de serveur d'envoi : préparer un courriel localement.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const fields = new FormData(contactForm);
    const subject = String(fields.get('subject') || 'Message depuis le site').slice(0, 150);
    const body = [
      `Nom : ${String(fields.get('name') || '').slice(0, 100)}`,
      `Email : ${String(fields.get('email') || '').slice(0, 254)}`,
      '',
      String(fields.get('message') || '').slice(0, 5000)
    ].join('\n');
    const mailto = `mailto:isaacnewton0003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.assign(mailto);
  });
}
