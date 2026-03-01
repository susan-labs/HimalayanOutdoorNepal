# Himalayan Outdoor Nepal – Product Showcase

A responsive static website to showcase products with images and specifications.

## Setup

1. Add your product images (JPG) to the `products/` folder.
2. Edit `data/products.json`: add one object per product with `id`, `image` (path to JPG), `name`, `description`, and `specs` (key-value pairs).

Example entry:

```json
{
  "id": "product-1",
  "image": "products/your-photo.jpg",
  "name": "Product Name",
  "description": "Short description.",
  "specs": {
    "Material": "…",
    "Weight": "…",
    "Dimensions": "…"
  }
}
```

## Contact form

The contact page (`contact.html`) uses [Formspree](https://formspree.io/) so enquiries are emailed to you without a backend:

1. Sign up at [formspree.io](https://formspree.io/) and create a new form.
2. Copy your form ID (e.g. `xpwnqkab` from the endpoint `https://formspree.io/f/xpwnqkab`).
3. In `contact.html`, replace `YOUR_FORM_ID` in the form `action` with your form ID:
   `action="https://formspree.io/f/YOUR_FORM_ID"` → `action="https://formspree.io/f/xpwnqkab"`.

Submissions will be sent to the email you used for Formspree. The form shows a success message on the same page after sending.

## Run locally

Open `index.html` in a browser, or use a local server (e.g. `npx serve .`) so `data/products.json` loads correctly.

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Source**: choose the branch (e.g. `main`) and folder **/ (root)**.
3. Save; the site will be available at `https://<username>.github.io/HimalayanOutdoorNepal/`.
