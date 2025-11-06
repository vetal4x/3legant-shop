/* Elements */

const topbar = document.querySelector('.top-bar');
const closeTopbarBtn = topbar
  ? document.querySelector('.top-bar__close-button')
  : null;
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
  if (!topbar) return;
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
  const clickedOnCloseTopbar = closeTopbarBtn
    ? closeTopbarBtn.contains(e.target)
    : false;

  if (!clickedInsideMenu && !clickedOnHamburger && !clickedOnCloseTopbar) {
    closeMenu();
  }
});

/* Glide Slider */

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.glide');

  if (!slider) return;

  new Glide(slider, {
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

/* Flow Dropdown Filter */

document.querySelectorAll('.flow-dropdown-filter').forEach((filter) => {
  const button = filter.querySelector('.filter-button');
  const title = filter.querySelector('.filter-title');
  const options = filter.querySelectorAll('.filter-option');

  const selected = filter.querySelector('.filter-option.selected');
  if (selected) {
    title.textContent = selected.textContent;
  } else {
    options[0].classList.add('selected');
    title.textContent = options[0].textContent;
  }

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    filter.classList.toggle('open');
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      title.textContent = option.textContent;

      options.forEach((o) => o.classList.remove('selected'));
      option.classList.add('selected');

      filter.classList.remove('open');
    });
  });
});

/* Show More Posts Button */

document.addEventListener('DOMContentLoaded', () => {
  const posts = document.querySelectorAll('.blog-post');
  const button = document.querySelector('.blog-posts__button');
  if (!button) return;
  const visibleCount = 6;
  let expanded = false;

  function updatePosts() {
    posts.forEach((post, index) => {
      if (!expanded && index >= visibleCount) {
        post.style.display = 'none';
      } else {
        post.style.display = 'flex';
      }
    });
    button.textContent = expanded ? 'Show Less' : 'Show More';
  }

  button.addEventListener('click', () => {
    expanded = !expanded;
    updatePosts();
  });

  updatePosts();
});

/* Recommended Articles List */

const container = document.getElementById('recommendedList');

if (container) {
  // Define the site root
  const siteRoot =
    window.location.origin + window.location.pathname.split('/blog/')[0];

  // Load the main blog page
  fetch(siteRoot + '/blog.html')
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const posts = doc.querySelectorAll('.blog-post');
      const currentPage = window.location.pathname.split('/').pop();

      // Filter out the current article and shuffle the rest
      const otherPosts = Array.from(posts).filter((post) => {
        const link = post.querySelector('.blog-post__link');
        return link && !link.href.endsWith(currentPage);
      });

      const randomPosts = otherPosts
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // Add 3 random posts to the container
      randomPosts.forEach((post) => {
        const clone = post.cloneNode(true);

        // Fix links
        clone.querySelectorAll('a').forEach((a) => {
          let href = a.getAttribute('href');
          if (href && !href.startsWith('http')) {
            if (href.startsWith('/')) href = href.slice(1);
            a.href = siteRoot + '/' + href;
          }
        });

        // Fix image paths
        clone.querySelectorAll('img').forEach((img) => {
          let src = img.getAttribute('src');
          if (src && !src.startsWith('http')) {
            if (src.startsWith('/')) src = src.slice(1);
            img.src = siteRoot + '/' + src;
          }
        });

        container.appendChild(clone);
      });
    })
    .catch((err) => console.error('Error loading recommended posts:', err));
}
