import { Controller, Get } from 'inversify-express-utils';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
@Controller('/')
export class HomeController {
  @Get('/')
  public get(): string {
    return 'Home sweet home';
  }
}
