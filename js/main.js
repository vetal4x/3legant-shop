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

/* Product rendering, Filters  */

// Show 8 products at a time
const productsPerPage = 8;
let currentIndex = 0;
let allProducts = [];
let filteredProducts = [];

// Filter values
let selectedCategory = 'All Rooms';
let selectedPrice = 'All Prices';
let selectedSort = '';

// Make product card HTML
function makeProductCard(product) {
  let stars = '';
  for (let i = 0; i < Math.floor(product.rating); i++) {
    stars += `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
          <path d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10996L9.99874 4.80556C10.0707 4.97868 10.2336 5.09696 10.4204 5.11194L14.4102 5.4318C14.8535 5.46734 15.0332 6.02059 14.6955 6.30993L11.6557 8.91378C11.5133 9.03576 11.4512 9.22715 11.4947 9.40952L12.4234 13.3028C12.5265 13.7354 12.0559 14.0773 11.6764 13.8455L8.26063 11.7592C8.10062 11.6615 7.89938 11.6615 7.73937 11.7592L4.32363 13.8455C3.94408 14.0773 3.47345 13.7354 3.57665 13.3028L4.50534 9.40952C4.54884 9.22715 4.48665 9.03576 4.34426 8.91378L1.30453 6.30993C0.966758 6.02059 1.14652 5.46734 1.58985 5.4318L5.57955 5.11194C5.76645 5.09696 5.92925 4.97868 6.00126 4.80556L7.53834 1.10997Z"/>
          </svg>`;
  }

  let newLabel = '';
  if (product.labels && product.labels.includes('new')) {
    newLabel = '<span class="product-card__label--new">NEW</span>';
  }

  let saleLabel = '';
  if (product.labels && product.labels.includes('sale')) {
    saleLabel = '<span class="product-card__label--sale">Sale</span>';
  }

  let oldPriceHtml = '';
  if (product.oldPrice) {
    oldPriceHtml = '<span class="product-info__old-price">$' + product.oldPrice.toFixed(2) + '</span>';
  }

  let descriptionHtml = '';
  if (product.description) {
    descriptionHtml = '<p class="product-info__description">' + product.description + '</p>';
  }

  const html = `
    <div class="product-card">
      <div class="product-card__main">
        <div class="product-card__item-top">
          <div class="product-card__features">
            ${newLabel}
            ${saleLabel}
          </div>
          <button class="product-card__favourite-button product-card__favourite-button--two-per-row">
            <svg class="product-card__favourite-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
              <path d="M12.6924 6.91706C12.3055 7.28838 11.6945 7.28838 11.3076 6.91706L10.6152 6.2526C9.80477 5.47487 8.70994 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 11.8826 4.28979 13.8501 6.15176 15.4666C8.01532 17.0844 10.2434 18.1574 11.5746 18.7051C11.853 18.8196 12.147 18.8196 12.4254 18.7051C13.7566 18.1574 15.9847 17.0844 17.8482 15.4666C19.7102 13.85 21 11.8826 21 9.5C21 7.01472 18.9853 5 16.5 5C15.2901 5 14.1952 5.47487 13.3848 6.2526L12.6924 6.91706ZM12 4.80957C10.8321 3.6888 9.24649 3 7.5 3C3.91015 3 1 5.91015 1 9.5C1 15.8683 7.97034 19.385 10.8138 20.5547C11.5796 20.8697 12.4204 20.8697 13.1862 20.5547C16.0297 19.385 23 15.8682 23 9.5C23 5.91015 20.0899 3 16.5 3C14.7535 3 13.1679 3.6888 12 4.80957Z" fill="rgb(20,23,24)" fill-rule="evenodd"/>
            </svg>
          </button>
        </div>
        <div class="product-card__image">
          <img src="${product.image}" alt="${product.name}" class="product-card__img" />
        </div>
      </div>
      <div class="product__product-info">
        <div class="product-info__rating">${stars}</div>
        <div class="product-info__title-row">
          <span class="product-info__name">${product.name}</span>
          <button class="product-card__favourite-button product-card__favourite-button--one-per-row">
            <svg class="product-card__favourite-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
              <path d="M12.6924 6.91706C12.3055 7.28838 11.6945 7.28838 11.3076 6.91706L10.6152 6.2526C9.80477 5.47487 8.70994 5 7.5 5C5.01472 5 3 7.01472 3 9.5C3 11.8826 4.28979 13.8501 6.15176 15.4666C8.01532 17.0844 10.2434 18.1574 11.5746 18.7051C11.853 18.8196 12.147 18.8196 12.4254 18.7051C13.7566 18.1574 15.9847 17.0844 17.8482 15.4666C19.7102 13.85 21 11.8826 21 9.5C21 7.01472 18.9853 5 16.5 5C15.2901 5 14.1952 5.47487 13.3848 6.2526L12.6924 6.91706ZM12 4.80957C10.8321 3.6888 9.24649 3 7.5 3C3.91015 3 1 5.91015 1 9.5C1 15.8683 7.97034 19.385 10.8138 20.5547C11.5796 20.8697 12.4204 20.8697 13.1862 20.5547C16.0297 19.385 23 15.8682 23 9.5C23 5.91015 20.0899 3 16.5 3C14.7535 3 13.1679 3.6888 12 4.80957Z" fill="rgb(20,23,24)" fill-rule="evenodd"/>
            </svg>
          </button>
        </div>
        <div class="product-info__price">
          <span class="product-info__current-price">$${product.price.toFixed(2)}</span>
          ${oldPriceHtml}
        </div>
        ${descriptionHtml}
      </div>
      <button class="product-card__button">Add to cart</button>
    </div>
  `;

  return html;
}

// Show more products
function showMoreProducts() {
  const grid = document.querySelector('.products__grid');
  const productsToShow = filteredProducts.slice(currentIndex, currentIndex + productsPerPage);

  productsToShow.forEach(product => {
    const productHtml = makeProductCard(product);
    grid.innerHTML += productHtml;
  });

  currentIndex = currentIndex + productsToShow.length;

  // Hide button if no more products
  const showMoreBtn = document.querySelector('.show-more__button');
  if (currentIndex >= filteredProducts.length) {
    showMoreBtn.style.display = 'none';
  }
}

// Filter products by category and price
function filterProducts() {
  filteredProducts = [];

  allProducts.forEach(product => {
    let passCategory = true;
    let passPrice = true;

    // Check category
    if (selectedCategory !== 'All Rooms') {
      if (product.category !== selectedCategory) {
        passCategory = false;
      }
    }

    // Check price
    if (selectedPrice !== 'All Prices') {
      if (selectedPrice === '$0 - $100') {
        if (product.price < 0 || product.price > 100) {
          passPrice = false;
        }
      } else if (selectedPrice === '$100 - $200') {
        if (product.price < 100 || product.price > 200) {
          passPrice = false;
        }
      } else if (selectedPrice === '$200 - $300') {
        if (product.price < 200 || product.price > 300) {
          passPrice = false;
        }
      } else if (selectedPrice === '$300 - $400') {
        if (product.price < 300 || product.price > 400) {
          passPrice = false;
        }
      } else if (selectedPrice === '$400+') {
        if (product.price < 400) {
          passPrice = false;
        }
      }
    }

    if (passCategory && passPrice) {
      filteredProducts.push(product);
    }
  });

  // Sort products
  if (selectedSort === 'Customer Raiting') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === 'Price: Low to High') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'Price: High to Low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'Name (A-Z)') {
    filteredProducts.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  } else if (selectedSort === 'Name (Z-A)') {
    filteredProducts.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
  }
}

// Reset and show products
function resetProducts() {
  currentIndex = 0;
  const grid = document.querySelector('.products__grid');
  grid.innerHTML = '';

  filterProducts();

  if (filteredProducts.length === 0) {
    grid.innerHTML = '<div class="products__empty-message">No products found matching your filters.</div>';
    const showMoreBtn = document.querySelector('.show-more__button');
    if (showMoreBtn) {
      showMoreBtn.style.display = 'none';
    }
  } else {
    const showMoreBtn = document.querySelector('.show-more__button');
    if (showMoreBtn) {
      showMoreBtn.style.display = '';
    }
    showMoreProducts();
  }
}

// Setup filters
function setupFilters() {
  const categoryFilter = document.querySelector('.categories-filter');
  const priceFilter = document.querySelector('.price-filter');
  const sortFilter = document.querySelector('.sort-filter');

  if (!categoryFilter || !priceFilter || !sortFilter) {
    return;
  }

  // Category filter
  const categoryButton = categoryFilter.querySelector('.filter-button');
  const categoryTitle = categoryFilter.querySelector('.filter-title');
  const categoryOptions = categoryFilter.querySelectorAll('.filter-option');

  categoryButton.addEventListener('click', (e) => {
    e.stopPropagation();
    categoryFilter.classList.toggle('open');
  });

  categoryOptions.forEach(option => {
    option.addEventListener('click', () => {
      categoryOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      categoryTitle.textContent = option.textContent.trim();
      selectedCategory = option.textContent.trim();
      categoryFilter.classList.remove('open');
      resetProducts();
    });
  });

  // Price filter
  const priceButton = priceFilter.querySelector('.filter-button');
  const priceTitle = priceFilter.querySelector('.filter-title');
  const priceOptions = priceFilter.querySelectorAll('.filter-option');

  priceButton.addEventListener('click', (e) => {
    e.stopPropagation();
    priceFilter.classList.toggle('open');
  });

  priceOptions.forEach(option => {
    option.addEventListener('click', () => {
      priceOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      priceTitle.textContent = option.textContent.trim();
      selectedPrice = option.textContent.trim();
      priceFilter.classList.remove('open');
      resetProducts();
    });
  });

  // Sort filter
  const sortButton = sortFilter.querySelector('.filter-button');
  const sortTitle = sortFilter.querySelector('.filter-title');
  const sortOptions = sortFilter.querySelectorAll('.filter-option');

  sortButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sortFilter.classList.toggle('open');
  });

  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      sortOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      sortTitle.textContent = option.textContent.trim();
      selectedSort = option.textContent.trim();
      sortFilter.classList.remove('open');
      resetProducts();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    categoryFilter.classList.remove('open');
    priceFilter.classList.remove('open');
    sortFilter.classList.remove('open');
  });
}

// Start everything when page loads
function startApp() {
  // Get products from window
  if (window.products) {
    allProducts = window.products;
    filteredProducts = allProducts.slice();
  }

  // Check if grid exists
  const grid = document.querySelector('.products__grid');
  if (!grid) {
    console.log('Grid not found');
    return;
  }

  // Show first products
  resetProducts();

  // Setup show more button
  const showMoreBtn = document.querySelector('.show-more__button');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', showMoreProducts);
  }

  // Setup all filters
  setupFilters();
}

// Wait for page to load then start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
/* Product View */

document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.querySelector('.products__grid');
  const viewButtons = document.querySelectorAll('.view__button');

  if (!gridEl || !viewButtons.length) return;

  gridEl.classList.add('two-per-row');

  viewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      viewButtons.forEach((b) => b.classList.remove('view__button--active'));
      btn.classList.add('view__button--active');

      if (btn.classList.contains('view__button--one-per-row')) {
        gridEl.classList.add('one-per-row');
        gridEl.classList.remove('two-per-row');
      } else if (btn.classList.contains('view__button--two-per-row')) {
        gridEl.classList.add('two-per-row');
        gridEl.classList.remove('one-per-row');
      }
    });
  });
});
