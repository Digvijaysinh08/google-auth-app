import mongoose from 'mongoose';
import { logger } from '../utils';
import { ProcessEnv } from './index';

export const connectDB = async (): Promise<void> => {
    try {
        const MONGOURI = ProcessEnv.MONGO_URI;
        if (!MONGOURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(MONGOURI, {
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000,
        });
        mongoose.set('debug', ProcessEnv.MONGO_DEBUG === 'true');
        logger.info('⚡ Database connected. ⚡');
    } catch (error) {
        logger.error('🚨 Exhausted all retries. database connection failed. exiting process. 🚨', error);
        throw new Error('Failed to connect to the database');
    }
};
