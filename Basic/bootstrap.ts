import 'reflect-metadata';
import { Controller, InversifyExpressServer } from 'inversify-express-utils';
import { Kernel } from 'inversify';
import * as bodyParser from 'body-parser';
import TYPES from './constant/types';
import TAGS from './constant/tags';
import { HomeController } from './controller/home';
import { UserController } from './controller/user';
import { UserService } from './service/user';

// load everything needed to the kernel
let kernel = new Kernel();

kernel.bind<Controller>(TYPES.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
kernel.bind<Controller>(TYPES.Controller).to(UserController).whenTargetNamed(TAGS.UserController);
kernel.bind<UserService>(TYPES.Controller).to(UserService);

// start the server
let server = new InversifyExpressServer(kernel);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');
