(function () {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (form && statusEl) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formAction = form.getAttribute('action') || '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      if (formAction.indexOf('YOUR_FORM_ID') !== -1) {
        statusEl.textContent = 'Please set your Formspree form ID in contact.html.';
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
        .then(res => {
          if (res.ok) {
            statusEl.textContent = "Thanks! We've received your message and will get back to you soon.";
            statusEl.className = 'form-status success';
            form.reset();
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(() => {
          statusEl.textContent = 'Something went wrong. Please try again or email us directly.';
          statusEl.className = 'form-status error';
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
