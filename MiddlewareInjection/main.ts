import 'reflect-metadata';
import { Container, injectable } from 'inversify';
import * as express from 'express';
import * as morgan from 'morgan';
import { interfaces, InversifyExpressServer, TYPE, Get, Controller } from 'inversify-express-utils';
import { controllerFactory } from './controller';

let container = new Container();

container.bind<express.RequestHandler>('Morgan').toConstantValue(morgan('combined'));
container.bind<express.RequestHandler>('CustomMiddleware').toConstantValue(function customMiddleware(req: any, res: any, next: any) {
    req.user = {
        username: 'foo',
        password: 'bar'
    };
    next();
});

let controller = controllerFactory(container);
container.bind<interfaces.Controller>(TYPE.Controller).to(controller).whenTargetNamed('TestController');

let server = new InversifyExpressServer(container);
server.build().listen('3000', () => {console.log('Listening on port 3000')});
