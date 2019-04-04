import { Cache } from './Cache';

export class DefaultCache implements Cache {

    private cache = new Map<string, any>();

    has(key: string): boolean {
        return this.cache.has(key);
    }

    get(key: string) {
        return this.cache.get(key);
    }

    set(key: string, value: any): void {
        this.cache.set(key, value);
    }
}
