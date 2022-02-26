declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_API_ENDPOINT: string;
            NEXT_PUBLIC_API_ORIGIN: string;
        }
    }
}

export {};