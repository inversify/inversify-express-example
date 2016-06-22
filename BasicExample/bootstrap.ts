// general imports
import { InversifyExpressServer } from 'inversify-express-utils';
import { Kernel } from 'inversify';

// imports for the kernel
import { HomeController } from './controller/home';
import { UserController } from './controller/user';
import { UserService } from './service/user';

import 'reflect-metadata';

// load everything needed to the kernel
let kernel = new Kernel();
kernel.bind<HomeController>('HomeController').to(HomeController);
kernel.bind<UserController>('UserController').to(UserController);
kernel.bind<UserService>('UserService').to(UserService);

// start the server
let server = new InversifyExpressServer(kernel);
let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');
