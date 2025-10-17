# Windows Setup Guide

## ✅ **Issues Fixed**

1. **PowerShell Execution Policy**: ✅ Fixed
2. **Redis Service Imports**: ✅ Restored  
3. **Node.js PATH Issue**: ⚠️ Needs manual fix

## 🚀 **Complete Setup Steps**

### Step 1: Fix Node.js PATH

**Option A: Add to System PATH (Permanent)**
1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Click "Environment Variables"
3. Under "System Variables", find and select "Path"
4. Click "Edit" → "New" 
5. Add: `C:\Program Files\nodejs`
6. Click OK, restart your terminal

**Option B: Temporary PATH (Current Session)**
```powershell
$env:PATH += ";C:\Program Files\nodejs"
npm --version  # Should work now
```

### Step 2: Install Dependencies

```powershell
# Verify npm works
npm --version

# Install shared package first
cd shared
npm install
npm run build
cd ..

# Install backend dependencies  
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend  
npm install
cd ..

# Install root dependencies
npm install
```

### Step 3: Start Development

```powershell
# Terminal 1: Start Backend
cd backend
npm run start:dev

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

## 🔧 **Troubleshooting**

### If npm still doesn't work:
```powershell
# Use full path
& "C:\Program Files\nodejs\npm.cmd" --version
```

### If bcrypt fails to install:
The backend will work without bcrypt initially. You can:
1. Install Visual Studio Build Tools
2. Or use the mock authentication for development

### If Redis connection fails:
The app includes a mock Redis client, so it will work without Redis server.

## 🎯 **Expected Results**

- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000  
- **API Docs**: http://localhost:3001/api/docs

The Redis service is now properly configured and will work once dependencies are installed!