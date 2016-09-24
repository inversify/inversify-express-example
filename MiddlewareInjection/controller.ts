import { Kernel, injectable } from 'inversify';
import { Controller, Get } from 'inversify-express-utils';
import * as express from 'express';

export function controllerFactory (kernel: Kernel) {

    @injectable()
    @Controller('/')
    class TestController {
        constructor() {}

        @Get('/', 
            kernel.get<express.RequestHandler>('CustomMiddleware'),
            kernel.get<express.RequestHandler>('Morgan'))
        getUserName(req: any, res: any) {
            res.send(req.user.username);
        }
    }

    return TestController;
}
