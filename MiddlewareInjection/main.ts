import 'reflect-metadata';
import { Container } from 'inversify';
import * as express from 'express';
import * as morgan from 'morgan';
import { controllerFactory } from './controller';
import { InversifyExpressServer } from 'inversify-express-utils';

let container = new Container();

container.bind<express.RequestHandler>('Morgan').toConstantValue(morgan('combined'));
container.bind<express.RequestHandler>('CustomMiddleware').toConstantValue(function customMiddleware(req: any, res: any, next: any) {
    req.user = {
        password: 'bar',
        username: 'foo'
    };
    next();
});

controllerFactory(container);
let server = new InversifyExpressServer(container);
server.build().listen('3000', () => {console.log('Listening on port 3000')});
