import Redis from 'ioredis';

console.log('Connecting to Redis at:', process.env.REDIS_HOST, process.env.REDIS_PORT);

const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy: (times) => {
    const delay = Math.min(times * 100, 2000); // tối đa 2 giây
    console.log(`Redis retry after ${delay}ms`);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('Redis connected!');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err.message);
});

export default redis;
