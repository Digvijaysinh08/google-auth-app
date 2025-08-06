import fs from 'fs';
import { Router } from 'express';

const routers = Router();
const routes: string[] = fs.readdirSync(__dirname);

routers.get('/', (req, res) => {
    res.json({ message: 'Hello auth' });
});

routes.forEach(async (route: string) => {
    if (fs.lstatSync(`${__dirname}/${route}`).isDirectory()) {
        const { router } = await import(`./${route}`);
        routers.use(`/${route}`, router);
    }
});

export default routers;
