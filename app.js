// Mobile nav toggle
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });
}

// Close mobile menu after a link is clicked
document.querySelectorAll('#navbar ul a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
  });
});

// Navbar background intensifies on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
