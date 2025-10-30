/* Elements */

const topbar = document.querySelector('.top-bar');
const closeTopbarBtn = document.querySelector('.top-bar__close-button');
const header = document.querySelector('.header');
const hamburger = document.querySelector('.header__hamburger');
const closeMobileBtn = document.querySelector('.mobile-menu__close-button');
const mobileMenu = document.querySelector('.header__mobile-menu');

/* Functions */

const closeMenu = () => {
  header.classList.remove('open');
  document.body.classList.remove('lock');
};

const toggleMenu = () => {
  header.classList.toggle('open');
  document.body.classList.toggle('lock');
};

const closeTopbar = () => {
  topbar.classList.add('hidden');
  document.body.style.paddingTop = '0';
  mobileMenu.style.top = '0';
  mobileMenu.style.height = '100%';
};

/* Events */

closeTopbarBtn.addEventListener('click', closeTopbar);

hamburger.addEventListener('click', toggleMenu);
closeMobileBtn.addEventListener('click', closeMenu);

document.addEventListener('click', (e) => {
  const clickedInsideMenu = mobileMenu.contains(e.target);
  const clickedOnHamburger = hamburger.contains(e.target);
  const clickedOnCloseTopbar = closeTopbarBtn.contains(e.target);

  if (!clickedInsideMenu && !clickedOnHamburger && !clickedOnCloseTopbar) {
    closeMenu();
  }
});

/* Glide Slider */

document.addEventListener('DOMContentLoaded', () => {
  new Glide('.glide', {
    type: 'slider',
    startAt: 0,
    perView: 1,
    autoplay: 3000,
    hoverpause: true,
    keyboard: true,
    gap: 4,
      animationDuration: 600,
  }).mount();
});
