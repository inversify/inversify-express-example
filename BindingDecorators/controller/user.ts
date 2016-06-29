import { Controller, Get, Post, Put, Delete } from 'inversify-express-utils';
import { provideNamed, inject } from '../ioc/ioc';
import TYPES from '../constant/types';
import TAGS from '../constant/tags';
import { Request } from 'express';
import { User } from '../models/user';
import { UserService } from '../service/user';


@provideNamed(TYPES.Controller, TAGS.UserController)
@Controller('/user')
export class UserController {

  constructor( @inject(TYPES.UserService) private userService: UserService) { }

  @Get('/')
  public getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  public getUser(request: Request): Promise<User> {
    return this.userService.getUser(request.params.id);
  }

  @Post('/')
  public newUser(request: Request): Promise<User> {
    return this.userService.newUser(request.body);
  }

  @Put('/:id')
  public updateUser(request: Request): Promise<User> {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @Delete('/:id')
  public deleteUser(request: Request): Promise<any> {
    return this.userService.deleteUser(request.params.id);
  }
}
