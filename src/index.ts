import app from './app';
import { ProcessEnv } from './config';
import { connectDB } from './config/db';
import { logger } from './utils';

const PORT = ProcessEnv.PORT;

const startServer = async (): Promise<void> => {
    try {
        app.listen(PORT, () => {
            logger.info(`🚀 Server ${ProcessEnv.SERVER_NAME} is running at http://localhost:${PORT} 🚀`);
        });
        await connectDB();
    } catch (error) {
        logger.error('Error starting the server:', error);
        process.exit(1);
    }
};
startServer();
