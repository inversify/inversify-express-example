import 'reflect-metadata';
import { Controller, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { Kernel } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import TYPES from './constant/types';
import TAGS from './constant/tags';
import { HomeController } from './controller/home';
import { MongoDBClient } from './utils/mongodb/client';
import { UserController } from './controller/user';
import { UserService } from './service/user';

// load everything needed to the kernel
let kernel = new Kernel();

if (process.env.NODE_ENV === 'development') {
    let logger = makeLoggerMiddleware();
    kernel.applyMiddleware(logger);
}

kernel.bind<Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
kernel.bind<Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TAGS.UserController);
kernel.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
kernel.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
let server = new InversifyExpressServer(kernel);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(helmet());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');

exports = module.exports = app;
