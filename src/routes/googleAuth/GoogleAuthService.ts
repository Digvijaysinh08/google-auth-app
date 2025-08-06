import { Request, Response } from 'express';
import UserDao from '../../dao/UserDao';
import axios from 'axios';
import { getUserObj, logger, SignToken } from '../../utils';
import querystring from 'querystring';

class GoogleAuthService {
    async authGoogle(req: Request, res: Response) {
        try {
            const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

            const option = {
                redirect_uri: `${process.env.BASE_URL}/api/user/google-callback`,
                client_id: process.env.GOOGLE_CLIENT_ID,
                access_type: 'offline',
                response_type: 'code',
                prompt: 'consent',
                scope: 'email profile',
            };

            const googleAuthURL = `${rootURL}?${querystring.stringify(option)}`;

            return res.success({
                googleAuthUrl: googleAuthURL,
                message: 'Google auth link generated',
            });
        } catch (error) {
            return res.badRequest(null, 'Failed to generate Google auth link');
        }
    }

    async googleCallback(req: Request, res: Response) {
        const { code } = req.query;

        if (!code) return res.badRequest(null, 'Authorization code is required');

        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            querystring.stringify({
                code: code as string,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${process.env.BASE_URL}/api/user/google-callback`,
                grant_type: 'authorization_code',
            })
        );

        console.log('callbackresponse------------------>', response);

        const { access_token } = response.data;
        console.log('accestoken-------------fsdf--------------', access_token);

        const userInfoRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const googleUser = userInfoRes.data;
        console.log('-------------------------googleUser------------------->', googleUser);

        const email = googleUser.email;
        console.log('email', email);

        const findUser = await UserDao.getUserByEmail(email);

        if (findUser) {
            const token = SignToken({
                id: findUser._id.toString(),
                email: findUser.email,
            });

            return res.success({
                user: getUserObj(findUser),
                token,
                message: 'User logged in successfully',
            });
        }

        const user = await UserDao.create({
            name: googleUser.name,
            email: googleUser.email,
        });

        if (!user) return res.serverError(null, 'Something went wrong');

        const token = SignToken({
            id: user._id.toString(),
            email: user.email,
        });

        return res.redirect(`${process.env.CLIENT_URL}/`);
    }
}

export default new GoogleAuthService();
