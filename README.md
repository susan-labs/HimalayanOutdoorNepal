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

## Run locally

Open `index.html` in a browser, or use a local server (e.g. `npx serve .`) so `data/products.json` loads correctly.

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Source**: choose the branch (e.g. `main`) and folder **/ (root)**.
3. Save; the site will be available at `https://<username>.github.io/HimalayanOutdoorNepal/`.
