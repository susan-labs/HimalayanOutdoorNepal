(function () {
  const container = document.getElementById('products-container');
  const loadingEl = document.getElementById('loading');
  const modalOverlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalSpecs = document.getElementById('modal-specs');

  function renderProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML =
      '<div class="product-card__image-wrap">' +
      '<img class="product-card__image" src="' + escapeHtml(product.image) + '" alt="" loading="lazy">' +
      '</div>' +
      '<div class="product-card__body">' +
      '<h2 class="product-card__name">' + escapeHtml(product.name) + '</h2>' +
      '<p class="product-card__description">' + escapeHtml(product.description || '') + '</p>' +
      '<span class="product-card__cta">View details & specs</span>' +
      '</div>';
    card.addEventListener('click', function () {
      openModal(product);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(product);
      }
    });
    return card;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function openModal(product) {
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description || '';
    modalSpecs.innerHTML = '';
    if (product.specs && typeof product.specs === 'object') {
      for (const [key, value] of Object.entries(product.specs)) {
        const dt = document.createElement('dt');
        dt.textContent = key;
        const dd = document.createElement('dd');
        dd.textContent = value;
        modalSpecs.appendChild(dt);
        modalSpecs.appendChild(dd);
      }
    }
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) closeModal();
  });

  function showEmpty() {
    loadingEl.remove();
    const p = document.createElement('p');
    p.className = 'empty-state';
    p.textContent = 'No products to display. Add entries to data/products.json and images to the products folder.';
    container.appendChild(p);
  }

  function showProducts(products) {
    loadingEl.remove();
    container.querySelectorAll('.product-card').forEach(function (el) {
      el.remove();
    });
    products.forEach(function (product) {
      container.appendChild(renderProductCard(product));
    });
  }

  fetch('data/products.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load products');
      return res.json();
    })
    .then(function (data) {
      if (!Array.isArray(data) || data.length === 0) {
        showEmpty();
      } else {
        showProducts(data);
      }
    })
    .catch(function () {
      showEmpty();
    });
})();
