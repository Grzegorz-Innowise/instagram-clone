import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    getHello(): string {
        return 'Hello World!';
    }

    async checkCache() {
        try {
            await this.cacheManager.set('test_key', 'Hello Redis!');
            const value = await this.cacheManager.get('test_key');
            console.log('Wartość z Redis:', value);
            return value;
        } catch (error) {
            console.error('Błąd połączenia z Redis:', error);
            throw new Error('Błąd połączenia z Redis');
        }
    }

    async setCache() {
        try {
            await this.cacheManager.set('greet', 'Hello Redis!');
            console.log('Wartość zapisana w Redis: Hello Redis!');
        } catch (error) {
            console.error('Błąd podczas zapisywania do cache:', error);
            throw new Error('Błąd podczas zapisywania do cache');
        }
    }

    async getCache() {
        try {
            const value = await this.cacheManager.get('greet');
            console.log('Wartość z Redis:', value);
            return value;
        } catch (error) {
            console.error('Błąd podczas pobierania z cache:', error);
            throw new Error('Błąd podczas pobierania z cache');
        }
    }
}
