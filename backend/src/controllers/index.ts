import { Request, Response } from 'express';

class IndexController {
    public getHello(req: Request, res: Response): void {
        res.send('Hello World!');
    }

    public getGoodbye(req: Request, res: Response): void {
        res.send('Goodbye World!');
    }
}

export default IndexController;