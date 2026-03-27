(function () {
  const container = document.getElementById('product-container');
  const productId = getProductId();

  if (!productId) {
    showError('Product not found.');
    return;
  }

  function getProductId() {
    const queryId = new URLSearchParams(window.location.search).get('id');
    if (queryId) return queryId;

    const hash = window.location.hash || '';
    if (hash.startsWith('#id=')) {
      return decodeURIComponent(hash.slice(4));
    }
    if (hash.length > 1) {
      return decodeURIComponent(hash.slice(1));
    }

    // Support clean URLs like /product/colonel-80
    const path = window.location.pathname || '';
    const match = path.match(/\/product\/([^/]+)\/?$/i);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }

    return '';
  }

  function normalizeId(value) {
    return String(value || '').trim().toLowerCase();
  }

  function getAssetPath(path) {
    if (!path) return path;
    return path.startsWith('/') ? path : './' + path;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderProduct(product) {
    let specsHtml = '';
    if (product.specs && typeof product.specs === 'object') {
      specsHtml = '<dl class="product-detail__specs">';
      for (const [key, value] of Object.entries(product.specs)) {
        specsHtml += `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`;
      }
      specsHtml += '</dl>';
    }

    const imgSrc = getAssetPath(product.image);
    
    container.innerHTML = `
      <div class="product-gallery">
        <div class="product-gallery__main animate-on-scroll is-visible">
          <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(product.name)}" class="product-gallery__image">
        </div>
      </div>
      <div class="product-info animate-on-scroll is-visible" style="transition-delay: 100ms;">
        <h1 class="product-info__title">${escapeHtml(product.name)}</h1>
        <p class="product-info__description">${escapeHtml(product.description || '')}</p>
        <div class="product-info__specs-wrap">
          <h2 class="product-info__subtitle">Specifications</h2>
          ${specsHtml}
        </div>
        <div class="product-info__actions">
          <a href="contact.html?product=${product.id}" class="btn btn--primary btn--large">Enquire about this gear</a>
        </div>
      </div>
    `;
  }

  function showError(message) {
    container.innerHTML = `
      <div class="empty-state">
        <p>${message}</p>
        <a href="index.html#products" class="btn btn--primary">Back to products</a>
      </div>
    `;
  }

  fetch('data/products.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load products');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        showError('No products available.');
        return;
      }
      
      const targetId = normalizeId(productId);
      const product = data.find(p => normalizeId(p.id) === targetId);
      if (product) {
        document.title = `${product.name} – Himalayan Outdoor Nepal`;
        renderProduct(product);
      } else {
        showError('Product not found.');
      }
    })
    .catch(() => showError('Something went wrong loading the product.'));
})();
