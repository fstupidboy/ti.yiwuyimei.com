# YiwuYimei B2B Website

A modern B2B wholesale product showcase website built with Hugo. Domain: ti.yiwuyimei.com

## 🌟 Features

- **Responsive Design** - Mobile-first approach with breakpoints at 480px and 768px
- **Modern UI** - Minimalist business style inspired by Apple/Shopify
- **Fast Performance** - Static site generation with Hugo
- **SEO Optimized** - Semantic HTML with proper meta tags
- **Interactive Elements** - Smooth animations and form handling

## 🎨 Design Specifications

| Element | Color | Hex |
|---------|-------|-----|
| Primary | Deep Blue | `#0A2540` |
| Secondary | Brand Blue | `#1E3A5F` |
| Accent | Bright Blue | `#0066CC` |
| Background | White | `#FFFFFF` |
| Text | Dark Gray | `#1A1A1A` |

## 📁 Project Structure

```
ti.yiwuyimei.com/
├── config.toml              # Hugo configuration
├── content/
│   ├── _index.md            # Homepage content
│   └── products/            # Product pages
├── layouts/
│   ├── _default/
│   │   └── baseof.html      # Base template
│   ├── index.html           # Homepage template
│   └── partials/
│       ├── header.html      # Navigation
│       ├── hero.html        # Hero section
│       ├── categories.html  # Product categories
│       ├── products.html    # Featured products
│       ├── about.html       # About section
│       ├── contact.html     # Contact form
│       └── footer.html      # Footer
├── static/
│   ├── css/main.css         # Styles
│   ├── js/main.js           # Scripts
│   └── images/              # Images
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/) v0.152.2 or later (Extended version recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fstupidboy/ti.yiwuyimei.com.git
   cd ti.yiwuyimei.com
   ```

2. Install Hugo if you haven't already:
   ```bash
   # macOS
   brew install hugo

   # Windows
   choco install hugo-extended

   # Linux
   snap install hugo --channel=extended
   ```

### Local Development

Start the development server:

```bash
hugo server -D
```

The site will be available at `http://localhost:1313/`

Options:
- `-D` includes draft content
- `--disableFastRender` for full rebuilds
- `--bind 0.0.0.0` to expose on network

### Build for Production

Generate the static site:

```bash
hugo --minify
```

The output will be in the `public/` directory.

## 📄 Homepage Sections

1. **Header** - Fixed navigation with logo, menu links, and CTA button
2. **Hero** - Main banner with tagline and call-to-action buttons
3. **Categories** - 4 product category cards (Electronics, Home & Garden, Fashion, Sports)
4. **Products** - 8 featured product cards with pricing and MOQ info
5. **About** - Company introduction with stats and advantages
6. **Contact** - Quote request form with contact information
7. **Footer** - Links, social media, and copyright

## 🛠️ Customization

### Site Configuration

Edit `config.toml` to customize:
- Site title and description
- Contact information
- Product categories
- Featured products
- Navigation menus

### Styling

Modify `static/css/main.css` CSS variables:

```css
:root {
    --color-primary: #0A2540;
    --color-accent: #0066CC;
    /* ... */
}
```

### Adding Products

Add new products in `config.toml`:

```toml
[[params.products]]
  name = "Product Name"
  category = "Category"
  moq = "100 pcs"
  price = "$5.99 - $8.99"
```

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🌐 Deployment

### Cloudflare Pages

1. Connect your GitHub repository
2. Set build command: `hugo --minify`
3. Set output directory: `public`
4. Set environment variable: `HUGO_VERSION=0.152.2`

### Netlify

1. Connect your GitHub repository
2. Set build command: `hugo --minify`
3. Set publish directory: `public`
4. Add `netlify.toml` for Hugo version

### Vercel

1. Import your repository
2. Framework preset: Hugo
3. Build command: `hugo --minify`

## 📝 License

This project is proprietary. All rights reserved.

## 📞 Contact

- **Email**: sales@yiwuyimei.com
- **Phone**: +86 123 4567 8900
- **Address**: Yiwu International Trade City, Zhejiang, China
