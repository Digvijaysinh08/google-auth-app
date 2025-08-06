import jwt from 'jsonwebtoken';
import { SignUserToken } from '@types';
import { ProcessEnv } from '../config';

export const SignToken = (user: SignUserToken): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    return jwt.sign(payload, ProcessEnv.JWT_SECRET);
};
