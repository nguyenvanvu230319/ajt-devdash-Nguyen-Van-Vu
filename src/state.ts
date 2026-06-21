import { AppState, Post } from './types';

let state: AppState = { status: 'LOADING' };

export function getState(): AppState {
    return state;
}

export function setState(newState: AppState): void {
    state = newState;
}

export function createMemoizedSearch() {
    const cache: Record<string, Post[]> = {};
    
    return (posts: Post[], query: string): Post[] => {
        const cacheKey = `${query.toLowerCase().trim()}_${posts.length}`;
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        
        const result = posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase())
        );
        cache[cacheKey] = result;
        return result;
    };
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    
    return (...args: Parameters<T>) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}