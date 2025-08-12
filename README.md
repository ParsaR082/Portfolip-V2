# 3D Portfolio

A modern, interactive 3D portfolio built with Next.js 14+, TypeScript, and React Three Fiber.

## Features

- 🎨 **Interactive 3D Hero Section** - Engaging 3D elements with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Dynamic imports, lazy loading, and bundle optimization
- 🎭 **Smooth Animations** - Framer Motion powered transitions and interactions
- 🔍 **SEO Optimized** - Complete meta tags, Open Graph, and structured data
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation
- 🌙 **Dark Theme** - Beautiful dark mode design
- 📊 **Project Showcase** - Filterable project gallery with detailed modals
- 📧 **Contact Form** - Interactive contact form with validation
- 🚀 **Modern Stack** - Built with the latest web technologies

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **3D Graphics**: React Three Fiber + Drei
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: Next SEO
- **Fonts**: Inter + JetBrains Mono

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── Three/
│   │   ├── hooks/
│   │   │   └── useCompressedAssets.ts  # 3D asset loading hooks
│   │   ├── Loader.tsx       # 3D loading components
│   │   └── Scene.tsx        # Main 3D scene
│   ├── About.tsx            # About section
│   ├── Footer.tsx           # Footer with contact form
│   ├── Header.tsx           # Navigation header
│   ├── Hero3D.tsx           # 3D hero section
│   └── Projects.tsx         # Projects showcase
├── lib/
│   ├── projects.ts          # Project data
│   └── seo.ts              # SEO configuration
├── public/
│   └── models/             # 3D models (GLB/GLTF files)
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Customization

### Personal Information

1. **Update SEO config** in `lib/seo.ts`:
   ```typescript
   export const CONFIG = {
     name: 'Your Name',
     email: 'your@email.com',
     // ... other config
   };
   ```

2. **Update project data** in `lib/projects.ts`:
   ```typescript
   export const projects: Project[] = [
     {
       title: 'Your Project',
       description: 'Project description',
       // ... other project data
     },
   ];
   ```

### Styling

- **Colors**: Modify the color palette in `tailwind.config.ts`
- **Fonts**: Update font imports in `app/layout.tsx`
- **Animations**: Customize animations in `tailwind.config.ts`

### 3D Elements

- **3D Models**: Add your GLB/GLTF files to `public/models/`
- **Scene**: Customize the 3D scene in `components/Three/Scene.tsx`
- **Interactions**: Modify interactions in `components/Hero3D.tsx`

## Performance Optimization

- **Dynamic Imports**: 3D components are dynamically imported
- **Image Optimization**: Next.js Image component with WebP support
- **Bundle Analysis**: Run `npm run build` to analyze bundle size
- **3D Asset Compression**: Supports Draco, KTX2, and Meshopt compression

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run start
```

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+
- **WebGL Support**: Required for 3D features
- **Fallbacks**: Graceful degradation for unsupported browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!

## Support

If you have any questions or need help customizing the portfolio, feel free to open an issue or reach out.

---

**Built with ❤️ and lots of coffee**