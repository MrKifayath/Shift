# Pomodoro Productivity App

A comprehensive Pomodoro timer productivity application built with NestJS, Next.js 14, PostgreSQL, and Redis.

## Features

- 🍅 Pomodoro Timer with customizable durations
- ✅ Task Management with categories
- 📊 Productivity Analytics and Statistics
- 🔔 Smart Notifications
- 👤 User Authentication and Preferences
- 🎯 Goal Setting and Progress Tracking
- 📱 Responsive Design

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **PostgreSQL** - Primary database
- **Redis** - Caching and session management
- **TypeORM** - Database ORM
- **JWT** - Authentication
- **Swagger** - API documentation

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Zustand** - State management
- **React Query** - Server state management
- **Framer Motion** - Animations

### Development Tools
- **Docker** - Containerization
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Testing framework

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pomodoro-productivity-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp frontend/.env.example frontend/.env
   ```

4. **Start development environment with Docker**
   ```bash
   docker-compose up -d
   ```

   Or run services individually:

5. **Start services manually**
   ```bash
   # Start databases
   docker-compose up postgres redis -d
   
   # Install and build shared package
   cd shared && npm install && npm run build && cd ..
   
   # Start backend
   cd backend && npm install && npm run start:dev
   
   # Start frontend (in another terminal)
   cd frontend && npm install && npm run dev
   ```

### Available Scripts

#### Root Level
- `npm run dev` - Start both backend and frontend
- `npm run build` - Build all packages
- `npm run test` - Run all tests
- `npm run lint` - Lint all packages

#### Backend
- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run migration:generate` - Generate database migration
- `npm run migration:run` - Run database migrations

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests

#### Shared
- `npm run build` - Build shared types and utilities
- `npm run dev` - Watch mode for development

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:3001/api/docs

## Project Structure

```
pomodoro-productivity-app/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── tasks/          # Task and category management
│   │   ├── timer/          # Pomodoro timer logic
│   │   ├── config/         # Configuration
│   │   └── redis/          # Redis service
│   └── ...
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── store/         # Zustand stores
│   │   └── lib/           # Utilities
│   └── ...
├── shared/                 # Shared types and utilities
│   └── src/
│       ├── types/         # TypeScript interfaces
│       └── utils/         # Shared utilities
└── docker-compose.yml     # Development environment
```

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=pomodoro_app
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.