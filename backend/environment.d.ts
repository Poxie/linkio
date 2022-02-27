declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            MYSQL_USERNAME: string;
            MYSQL_PASSWORD: string;
            MYSQL_DATABASE: string;
            PORT: number;
            IMAGE_ENDPOINT: string;
            BCRYPT_SALT_ROUNDS: string;
        }
    }
}

export {};