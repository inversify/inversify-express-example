import { controller, httpGet } from 'inversify-express-utils';
import { injectable } from 'inversify';

@injectable()
@controller('/')
export class HomeController {
  @httpGet('/')
  public get(): string {
    return 'Home sweet home';
  }
}
