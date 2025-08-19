<div align="center">
  <img src="public/logo.png" alt="Blinky Logo" width="100" height="100">
  <h1>🔗 Blinky</h1>
  <p><em>Enhance Your Link Management</em></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#installation">Installation</a> •
    <a href="#api">API</a> •
    <a href="#tech-stack">Tech Stack</a>
  </p>

  <img src="https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=flat-square&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind">
</div>

---

## ✨ Features

- 🚀 **Fast & Modern** - Built with Next.js 15 and React 19
- 🔐 **Secure Authentication** - OAuth with GitHub and Google
- 📊 **User Dashboard** - Manage all your short links in one place
- 🎨 **Beautiful UI** - Clean, responsive design with Tailwind CSS
- 🔧 **Type Safe** - Full TypeScript support
- 📱 **Mobile Ready** - Responsive design for all devices
- 🛡️ **Secure** - Built-in authentication and authorization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/blinky.git
cd blinky

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Authentication
AUTH_SECRET="your-secret-key"
AUTH_TRUST_HOST=true

# GitHub OAuth (Optional)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# Google OAuth (Optional)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Database
DATABASE_URL="file:./data/dev.db"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio
npm run db:studio
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Available Scripts

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Start development server with Turbopack |
| `npm run build`      | Build the application for production    |
| `npm run start`      | Start the production server             |
| `npm run lint`       | Run ESLint                              |
| `npm run db:migrate` | Run Prisma migrations                   |
| `npm run db:studio`  | Open Prisma Studio                      |
| `npm run db:reset`   | Reset and migrate database              |

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[class-variance-authority](https://cva.style/)** - Component variants
- **[Shadcn](https://ui.shadcn.com/)** - UI Components

### Database & ORM

- **[Prisma 6](https://www.prisma.io/)** - Next-generation ORM
- **[SQLite](https://www.sqlite.org/)** - Lightweight database (development)

### Authentication

- **[NextAuth.js 5](https://next-auth.js.org/)** - Authentication for Next.js
- **[Prisma Adapter](https://authjs.dev/reference/adapter/prisma)** - Database adapter

### Utilities

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source. Feel free to use it for your own projects!

## 🙏 Acknowledgments

- Built with love using modern web technologies
- Inspired by the need for simple, elegant link management
- Thanks to the open source community for the amazing tools
