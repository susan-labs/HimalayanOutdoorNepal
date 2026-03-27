# Himalayan Outdoor Nepal - Development Mandates

This document defines the foundational standards and architectural direction for the Himalayan Outdoor Nepal website. Adherence to these mandates ensures a high-quality, responsive, and accessible user experience.

## 1. Core Engineering Standards

- **Semantic HTML:** Always use the most appropriate HTML5 elements (e.g., `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`). Ensure a logical heading hierarchy (`h1` through `h6`).
- **Responsive Design (Mobile-First):** Implement styles using a mobile-first approach. Utilize CSS Flexbox and Grid for layouts. Avoid fixed widths; use relative units like `rem`, `em`, `%`, `vw`, and `vh`.
- **Modern CSS:**
    - Use **CSS Custom Properties (Variables)** for colors, spacing, and typography to maintain consistency.
    - Prefer **Clamp()** for fluid typography and spacing that scales between screen sizes.
    - Utilize **Container Queries** where appropriate for component-level responsiveness.
- **Accessibility (a11y):**
    - Maintain a minimum WCAG 2.1 AA compliance level.
    - Ensure all interactive elements are keyboard accessible with visible focus states.
    - Use `aria-labels` and `aria-expanded` correctly for dynamic components like the mobile menu and product modals.
    - Images must have descriptive `alt` text (or `alt=""` for decorative ones).

## 2. Performance & Optimization

- **Image Strategy:**
    - Use modern formats (WebP/AVIF) with fallback to JPEG/PNG.
    - Implement `loading="lazy"` for images below the fold.
    - Use the `srcset` attribute for responsive images to serve optimal sizes for different devices.
- **Asset Management:** Keep JavaScript lightweight and vanilla. Avoid large third-party libraries unless absolutely necessary.

## 3. Project-Specific Conventions

- **Data-Driven UI:** The product catalog is driven by `data/products.json`. Any changes to the product list or structure must be reflected in both the JSON and the rendering logic in `js/main.js`.
- **Component Styling:** Follow a consistent naming convention (like BEM) for CSS classes to ensure styles remain modular and predictable.
- **Form Handling:** The contact form in `contact.html` should include robust client-side validation and clear success/error feedback for the user.

## 4. Visual Aesthetic Goals

- **Mountain Heritage:** The design should reflect the rugged yet reliable nature of trekking gear. Use the established palette of deep greens (`#25632d`), earthy neutrals (`#f5f4f0`), and high-visibility accents (`#e85a4d`).
- **Clean Interactions:** Provide subtle hover states, smooth transitions for modals, and clear visual cues for all interactive elements.

## 5. Development Workflow

1.  **Research:** Before making changes, check existing CSS variables in `css/style.css` and the data structure in `products.json`.
2.  **Implementation:** Ensure every new feature is responsive and tested on multiple viewport sizes.
3.  **Validation:** Use `run_shell_command` to check for HTML/CSS linting if tools are available, and manually verify accessibility using keyboard navigation.
