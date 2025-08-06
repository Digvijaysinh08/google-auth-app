import { Express, NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { ExpressError } from '@types';

export const errorHandling = (app: Express) => {
    app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
        logger.error(`Error in request:: ${req.originalUrl}`, err);
        if (res.headersSent) next(err);

        if (err.message === 'EntityNotFound.') res.notFound(null, 'Not Found.');

        res.status(err.status || 500).send({
            success: false,
            data: [],
            message: 'General Error',
        });
    });

    app.use((req: Request, res: Response) => {
        logger.error(`URL NOT FOUND: ${req.originalUrl}`);
        res.status(404).send({
            success: false,
            data: [],
            message: 'URL NOT FOUND',
        });
    });
};
