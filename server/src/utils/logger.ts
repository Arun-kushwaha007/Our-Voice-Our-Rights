const getTimestamp = (): string => {
    return new Date().toISOString();
};

export const logger = {
    info: (message: string) => {
        console.log(`[${getTimestamp()}] [INFO] ${message}`);
    },
    error: (message: string, error?: any) => {
        console.error(`[${getTimestamp()}] [ERROR] ${message}`, error);
    },
    warn: (message: string) => {
        console.warn(`[${getTimestamp()}] [WARN] ${message}`);
    }
};
