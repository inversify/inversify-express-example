import { Container, injectable } from 'inversify';
import { Controller, Get } from 'inversify-express-utils';
import * as express from 'express';

export function controllerFactory (container: Container) {

    @injectable()
    @Controller('/')
    class TestController {
        constructor() {}

        @Get('/',
            container.get<express.RequestHandler>('CustomMiddleware'),
            container.get<express.RequestHandler>('Morgan'))
        getUserName(req: any, res: any) {
            res.send(req.user.username);
        }
    }

    return TestController;
}
