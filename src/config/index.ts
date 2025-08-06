import dotenv from 'dotenv';

dotenv.config();

type ProcessEnv = {
    PORT: string;
    SERVER_NAME: string;
    MONGO_URI: string;
    NODE_ENV: string;
    MONGO_DEBUG: string;
    BCRYPT_ITERATIONS: string;
    JWT_SECRET: string;
};

export const ProcessEnv: ProcessEnv = {
    PORT: process.env.PORT!,
    SERVER_NAME: process.env.SERVER_NAME!,
    MONGO_URI: process.env.MONGO_URI!,
    NODE_ENV: process.env.NODE_ENV!,
    MONGO_DEBUG: process.env.MONGO_DEBUG!,
    BCRYPT_ITERATIONS: process.env.BCRYPT_ITERATIONS!,
    JWT_SECRET: process.env.JWT_SECRET!,
};
