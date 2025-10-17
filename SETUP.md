# Quick Setup Guide

## Fixed Issues

✅ **TypeScript Configuration**: Fixed strict property initialization issues
✅ **Package Dependencies**: Added missing dependencies to all package.json files
✅ **Validation DTOs**: Converted to proper interfaces and backend DTOs
✅ **Theme Provider**: Simplified to avoid next-themes dependency issues
✅ **ESLint Configuration**: Fixed backend ESLint config
✅ **Environment Files**: Created proper .env files
✅ **Redis Service**: Added fallback mock client for development

## Known Issues (Will resolve after npm install)

⚠️ **TypeScript Errors**: Some import errors will show until dependencies are installed
⚠️ **Redis Connection**: Will use mock client if Redis server is not running

## Next Steps to Run the Application

### 1. Fix Node.js PATH (Windows)

**Add Node.js to your PATH:**
1. Open System Properties → Environment Variables
2. Add `C:\Program Files\nodejs` to your PATH
3. Restart your terminal/IDE

**Or use full path temporarily:**
```powershell
# Set PATH for current session
$env:PATH += ";C:\Program Files\nodejs"

# Verify npm works
npm --version
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies  
cd frontend && npm install && cd ..

# Install shared dependencies and build
cd shared && npm install && npm run build && cd ..
```

### 2. Set up Database (Choose one option)

**Option A: Using Docker (Recommended)**
```bash
# Start only PostgreSQL and Redis
docker-compose up postgres redis -d
```

**Option B: Local Installation**
- Install PostgreSQL and Redis locally
- Create database named `pomodoro_app`
- Update connection details in `backend/.env`

### 3. Start the Applications

```bash
# Terminal 1: Start Backend
cd backend
npm run start:dev

# Terminal 2: Start Frontend  
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs

## Common Issues & Solutions

### TypeScript Errors
- Run `npm run build:shared` from root to rebuild shared types
- Restart your IDE/TypeScript service

### Database Connection Issues
- Ensure PostgreSQL is running on port 5432
- Check credentials in `backend/.env`
- Database will be created automatically on first run

### Redis Connection Issues  
- Ensure Redis is running on port 6379
- Redis is optional for basic functionality

### Port Conflicts
- Backend runs on port 3001
- Frontend runs on port 3000
- Change ports in respective .env files if needed

## Development Workflow

1. **Make changes to shared types**: Run `npm run build:shared`
2. **Backend changes**: Auto-reloads with `npm run start:dev`
3. **Frontend changes**: Auto-reloads with `npm run dev`
4. **Run tests**: `npm run test` from respective directories
5. **Lint code**: `npm run lint` from root or respective directories

## Project Structure

```
pomodoro-productivity-app/
├── backend/          # NestJS API server
├── frontend/         # Next.js web application  
├── shared/           # Shared TypeScript types
├── docker-compose.yml # Database services
└── package.json      # Root workspace config
```