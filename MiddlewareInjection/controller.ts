import { Container, injectable } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import * as express from 'express';

export function controllerFactory (container: Container) {

    @injectable()
    @controller('/')
    class TestController {
        constructor() {}

        @httpGet('/',
            container.get<express.RequestHandler>('CustomMiddleware'),
            container.get<express.RequestHandler>('Morgan'))
        getUserName(req: any, res: any) {
            res.send(req.user.username);
        }
    }

    return TestController;
}
