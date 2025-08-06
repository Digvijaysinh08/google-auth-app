import { RequestHandler, Router } from 'express';
import GoogleAuthService from './GoogleAuthService';

const router = Router();

router.get('/', GoogleAuthService.authGoogle);

router.get('/google-callback', GoogleAuthService.googleCallback);

export { router };
