# Admin Dashboard System

This is an administrative dashboard system built with **Next.js** with support for secure authentication and team management functionality.

## Features

- Authentication system with admin-only access
- Admin dashboard at `/admin/dashboard`
- Team member management
- Activity monitoring
- Secure session management

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: Custom session-based authentication
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url> xxx
cd xxx
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```
POSTGRES_URL=postgresql://username:password@localhost:5432/admin_dashboard
BASE_URL=http://localhost:3000
AUTH_SECRET=your_auth_secret_here_at_least_32_characters_long
```

4. Set up the database:
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

After running the seed script, you can login with:
- **Email**: admin@admin.com
- **Password**: admin123

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to access the admin panel.

## Project Structure

```
├── app/
│   ├── admin/
│   │   ├── login/          # Admin login page
│   │   └── dashboard/      # Admin dashboard pages
│   ├── (public)/           # Public pages (homepage, etc.)
│   └── api/               # API routes
├── components/            # Reusable UI components
├── lib/
│   ├── auth/             # Authentication logic
│   ├── db/               # Database schema and queries
│   └── utils/            # Utility functions
└── middleware.ts         # Route protection
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Drizzle Studio

## License

This project is licensed under the MIT License.