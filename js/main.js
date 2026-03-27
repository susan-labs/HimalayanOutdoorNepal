(function () {
  const container = document.getElementById('products-container');
  const loadingEl = document.getElementById('loading');

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe existing static elements
  document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

  function getAssetPath(path) {
    if (!path) return path;
    // Simple robust path handling
    return path.startsWith('/') ? path : './' + path;
  }

  function renderProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card animate-on-scroll';
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-haspopup', 'dialog');
    
    const imgSrc = getAssetPath(product.image);
    card.innerHTML = `
      <div class="product-card__image-wrap">
        <img class="product-card__image" 
             src="${escapeHtml(imgSrc)}" 
             alt="" 
             loading="lazy" 
             decoding="async">
      </div>
      <div class="product-card__body">
        <h2 class="product-card__name">${escapeHtml(product.name)}</h2>
        <p class="product-card__description">${escapeHtml(product.description || '')}</p>
        <span class="product-card__cta">View details & specs</span>
      </div>`;

    card.addEventListener('click', () => openProductPage(product));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProductPage(product);
      }
    });

    scrollObserver.observe(card);
    return card;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function openProductPage(product) {
    if (!product || !product.id) return;
    // Use hash so IDs survive clean-URL redirects used by some static servers.
    window.location.href = `product.html#id=${encodeURIComponent(product.id)}`;
  }


  function showEmpty() {
    if (loadingEl) loadingEl.remove();
    container.innerHTML = ''; // clear skeletons
    const p = document.createElement('p');
    p.className = 'empty-state';
    p.textContent = 'No products to display at the moment.';
    container.appendChild(p);
  }

  function showProducts(products) {
    if (loadingEl) loadingEl.remove();
    container.innerHTML = ''; // clear skeletons and existing cards
    products.forEach(product => container.appendChild(renderProductCard(product)));
  }

  fetch('data/products.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load products');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        showEmpty();
      } else {
        showProducts(data);
      }
    })
    .catch(() => showEmpty());
})();
