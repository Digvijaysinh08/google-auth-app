import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ObjectSchema, ValidationError, ValidationOptions, ValidationResult } from 'joi';
import { logger } from '.';

type RequestDataField = 'body' | 'params' | 'query' | 'headers';

export const validate = (schema: ObjectSchema, field: RequestDataField = 'body', options: ValidationOptions = {}) =>
    (async (req: Request, res: Response, next: NextFunction) => {
        const result: ValidationResult = schema.validate(req[field], options);

        if (!result.error) {
            req[field] = result.value;
            return next();
        }

        logger.error('Request validation failed with error', JSON.stringify(result.error));
        return res.badRequest(null, mapErrorMessage('en', result.error));
    }) as RequestHandler;

export function mapErrorMessage(_lang: string, error: ValidationError): string {
    return error.details.map(detail => detail.message).join(', ');
}
