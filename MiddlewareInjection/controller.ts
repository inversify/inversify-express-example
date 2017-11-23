import { Container } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import * as express from 'express';

export function controllerFactory (container: Container) {

    @controller('/')
    class TestController {

        @httpGet('/',
            container.get<express.RequestHandler>('CustomMiddleware'),
            container.get<express.RequestHandler>('Morgan')
        )
        public getUserName(req: any, res: any) {
            res.send(req.user.username);
        }
    }

    return TestController;
}
