import { Controller, Get, TYPE } from 'inversify-express-utils';
import { provideNamed } from '../ioc/ioc';
import TYPES from '../constant/types';
import TAGS from '../constant/tags';

@provideNamed(TYPE.Controller, TAGS.HomeController)
@Controller('/')
export class HomeController {
  @Get('/')
  public get(): string {
    return 'Home sweet home';
  }
}
