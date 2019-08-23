import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import { Container } from 'inversify';

let container = new Container();
// start the server
let server = new InversifyExpressServer(container);

server.setConfig((theApp) => {
  theApp.use(bodyParser.urlencoded({
    extended: true
  }));
  theApp.use(bodyParser.json());
  theApp.use(helmet());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');

exports = module.exports = app;
