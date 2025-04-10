import { Injectable } from '@nestjs/common';

interface CacheItem<T> {
  value: T;
  timestamp: number;
}

@Injectable()
export class InMemoryCacheService {
  private store = new Map<string, CacheItem<any>>();
  private readonly defaultTtl = 1000 * 60 * 60; // 1 hora

  set<T>(key: string, value: T, ttl: number = this.defaultTtl): void {
    this.store.set(key, { value, timestamp: Date.now() + ttl });
  }

  get<T>(key: string): T | null {
    const item = this.store.get(key);
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }
}
