# BucksBunny - Income Management SaaS

A modern, professional income management application built with Next.js 14, TypeScript, Prisma, and NextAuth.

## 🚀 Features

- 🔐 **Secure Authentication** - NextAuth with bcrypt password hashing
- 💰 **Income Management** - Add, view, and delete income records with beautiful UI
- 📊 **Analytics Dashboard** - Interactive charts with Recharts (Line & Bar charts)
- 🎨 **Modern UI** - Glassmorphism design with emerald radial glow theme
- 📱 **Responsive Design** - Mobile-first approach with collapsible sidebar
- 🔔 **Toast Notifications** - Beautiful feedback for user actions
- 🗃️ **PostgreSQL Database** - Robust data persistence with Prisma ORM

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js with bcrypt
- **Charts:** Recharts
- **Package Manager:** Bun

## 📋 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL and secrets
   ```

4. **Setup database**
   ```bash
   bun prisma migrate dev
   bun prisma generate
   ```

5. **Start development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📚 Documentation

For comprehensive documentation including component details, API routes, and architecture, see [DOCUMENTATION.md](./DOCUMENTATION.md).

## 🎯 Key Pages

- **Landing Page** (`/`) - Welcome page with sign-in/sign-up
- **Dashboard** (`/dashboard`) - Main dashboard with quick actions
- **Income Management** (`/dashboard/income`) - Full CRUD for income records
- **Monthly Summary** (`/dashboard/monthly-summary`) - Analytics with interactive charts

## 🔧 Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/bucksunny"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 📖 Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   └── layout.tsx        # Root layout
├── components/
│   ├── dashboard/        # Dashboard components
│   ├── monthly-summary/  # Analytics components
│   └── auth/             # Authentication forms
└── lib/                  # Utilities and configurations
```

## 🎨 Features Overview

### Income Management
- Add income records with client, amount, and payment mode
- View all records in a responsive table
- Delete records with confirmation modal
- Real-time statistics (total, average, count)

### Monthly Analytics
- Interactive line and bar charts
- Monthly income aggregation
- Statistics cards with totals and averages
- Responsive chart visualization

### Invoice Generator
- Professional invoice creation with multiple themes
- Client details and payment information
- Print functionality using browser's print dialog
- Preview mode with edit capabilities
- Theme customization (Professional, Emerald, Corporate, Modern)

### UI/UX
- Emerald theme with glassmorphism effects
- Mobile-responsive sidebar with backdrop
- Toast notifications for user feedback
- Loading states and empty state handling

## 🚀 Deployment

```bash
# Build for production
bun build

# Start production server
bun start
```

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
