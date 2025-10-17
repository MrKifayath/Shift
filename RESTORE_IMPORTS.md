# Restore Imports After Node.js Installation

After installing Node.js and running `npm install`, restore these files:

## 1. backend/src/redis/redis.module.ts

Replace the commented imports with:
```typescript
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
```

And uncomment the @Global() and @Module() decorators.

## 2. backend/src/redis/redis.service.ts

Replace the commented import with:
```typescript
import { Injectable, Inject } from '@nestjs/common';
```

And restore the decorators:
```typescript
@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: any) {}
```

## Quick Restore Commands

After `npm install`, run these replacements:

1. **Redis Module**: Uncomment all the commented code
2. **Redis Service**: Restore the @Injectable() and @Inject() decorators

## Or Use Git

If you have git, you can restore the original files after npm install:
```bash
git checkout backend/src/redis/
```