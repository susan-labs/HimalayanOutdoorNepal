(function () {
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');
  var nav = document.querySelector('.site-nav');
  var navToggle = document.querySelector('.nav-toggle');
  var yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  if (form && statusEl) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var formAction = form.getAttribute('action') || '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (formAction.indexOf('YOUR_FORM_ID') !== -1) {
        statusEl.textContent = 'Please set your Formspree form ID in contact.html (see README).';
        statusEl.className = 'form-status error';
        return;
      }

      statusEl.textContent = 'Sending…';
      statusEl.className = 'form-status';
      if (submitBtn) submitBtn.disabled = true;

      fetch(formAction, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            statusEl.textContent = "Thanks! We've received your message and will get back to you soon.";
            statusEl.className = 'form-status success';
            form.reset();
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(function () {
          statusEl.textContent = 'Something went wrong. Please try again or email us directly.';
          statusEl.className = 'form-status error';
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
