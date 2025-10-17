import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

// Mock Redis client for development when Redis is not available
const createMockRedisClient = () => ({
  get: async (): Promise<string | null> => null,
  set: async (): Promise<string> => 'OK',
  setex: async (): Promise<string> => 'OK',
  del: async (): Promise<number> => 1,
  exists: async (): Promise<number> => 0,
  hget: async (): Promise<string | null> => null,
  hset: async (): Promise<number> => 1,
  hgetall: async (): Promise<Record<string, string>> => ({}),
  expire: async (): Promise<number> => 1,
  ping: async (): Promise<string> => 'PONG',
});

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        try {
          // Try to load ioredis
          const Redis = eval('require')('ioredis');
          const redis = new Redis({
            host: configService.get('REDIS_HOST', 'localhost'),
            port: configService.get('REDIS_PORT', 6379),
            password: configService.get('REDIS_PASSWORD'),
            retryDelayOnFailover: 100,
            enableReadyCheck: false,
            maxRetriesPerRequest: null,
            lazyConnect: true,
          });
          
          // Test connection
          await redis.ping();
          console.log('✅ Redis connected successfully');
          return redis;
        } catch (error) {
          console.warn('⚠️  Redis not available, using in-memory mock client');
          return createMockRedisClient();
        }
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule { }