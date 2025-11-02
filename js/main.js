/* Elements */

const topbar = document.querySelector('.top-bar');
const closeTopbarBtn = topbar ? document.querySelector('.top-bar__close-button') : null;
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
  if (!topbar) return; // если топбар нет, выходим
  topbar.classList.add('hidden');
  document.body.style.paddingTop = '0';
  mobileMenu.style.top = '0';
  mobileMenu.style.height = '100%';
};

/* Events */

if (closeTopbarBtn) {
  closeTopbarBtn.addEventListener('click', closeTopbar);
}

hamburger.addEventListener('click', toggleMenu);
closeMobileBtn.addEventListener('click', closeMenu);

document.addEventListener('click', (e) => {
  const clickedInsideMenu = mobileMenu.contains(e.target);
  const clickedOnHamburger = hamburger.contains(e.target);
  const clickedOnCloseTopbar = closeTopbarBtn ? closeTopbarBtn.contains(e.target) : false;

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

/* Show More Posts Button */

document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelectorAll(".blog-post");
  const button = document.querySelector(".blog-posts__button");
  const visibleCount = 6; // сколько показывать по умолчанию
  let expanded = false;

  function updatePosts() {
    posts.forEach((post, index) => {
      if (!expanded && index >= visibleCount) {
        post.style.display = "none";
      } else {
        post.style.display = "flex";
      }
    });
    button.textContent = expanded ? "Show Less" : "Show More";
  }

  button.addEventListener("click", () => {
    expanded = !expanded;
    updatePosts();
  });

  updatePosts(); // начальное состояние
});

