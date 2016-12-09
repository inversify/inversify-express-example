import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { container } from './ioc/ioc';

// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';

// start the server
let server = new InversifyExpressServer(container);

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
