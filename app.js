// app.js
// Toggle mobile menu

const navUl = document.querySelector('header ul');



// Optionally, close menu when a link is clicked (for mobile)
document.querySelectorAll('header ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (navUl.classList.contains('show')) {
      navUl.classList.remove('show');
    }
  });
});

// Smooth scrolling for section nav buttons
document.querySelectorAll('header ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = link.textContent.trim().toLowerCase();
    let targetSelector = '';
    if (section === 'about')   targetSelector = '.info-section';
    if (section === 'skills')  targetSelector = '.skills-section';
    if (section === 'projects')targetSelector = '.my-project';
    if (section === 'hobbies') targetSelector = '#hobbies';   // ← add this line

    if (targetSelector) {
      const targetEl = document.querySelector(targetSelector);
      targetEl && targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// Contact Me buttons scroll to contact section
document.querySelectorAll('button').forEach(btn => {
  if (btn.textContent.includes('Contact Me')) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const contactEl = document.querySelector('.contact-section');
      contactEl && contactEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// Project "Website" buttons open placeholder GitHub links
const projectLinks = [
  'https://github.com/Rajat-14/CS204_Group_Project.git',
  'https://github.com/your-username/project-two',
  'https://github.com/Rajat-14/C--Promela.git',
  // …add as many as you have projects
];

document.querySelectorAll('.project-info button').forEach((btn, index) => {
  // pick the URL at the same index (or fallback to placeholder)
  const url = projectLinks[index] || 'https://github.com/placeholder';
  btn.addEventListener('click', () => {
    window.open(url, '_blank');
  });
});

// Social icon clicks (GitHub, LinkedIn) open placeholder links
const socialIcons = document.querySelectorAll('.box-icons p');
if (socialIcons.length >= 2) {
  socialIcons[0].addEventListener('click', () => {
    window.open('https://github.com/rohit4kk', '_blank');
  });
  socialIcons[1].addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/rohit-verma-319313309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
  });
   socialIcons[2].addEventListener('click', () => {
    window.open('https://www.instagram.com/rohit_4kk?igsh=Mnl6NzJ4bmtmczZ1', '_blank');
  });
}

// Initialize AOS (if available)
if (typeof AOS !== 'undefined') {
  AOS.init();
}
