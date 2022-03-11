declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_API_ENDPOINT: string;
            NEXT_PUBLIC_API_ORIGIN: string;
            NEXT_PUBLIC_IMAGE_ENDPOINT: string;
            NEXT_PUBLIC_WEBSITE_NAME: string;
        }
    }
}

export {};