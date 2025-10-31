import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache();

export const cacheMiddleware = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        res.send(cachedResponse);
        return;
    }

    const originalSend = res.send;
    res.send = (body) => {
        cache.set(key, body, duration);
        return originalSend.call(res, body);
    };

    next();
};
