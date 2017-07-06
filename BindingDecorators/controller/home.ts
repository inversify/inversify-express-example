import { controller, httpGet, TYPE } from 'inversify-express-utils';
import { provideNamed } from '../ioc/ioc';
import TAGS from '../constant/tags';

@provideNamed(TYPE.Controller, TAGS.HomeController)
@controller('/')
export class HomeController {
  @httpGet('/')
  public get(): string {
    return 'Home sweet home';
  }
}
