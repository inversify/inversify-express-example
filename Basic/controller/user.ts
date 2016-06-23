import { Controller, Get, Post, Put, Delete } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { IUser, UserService } from '../service/user';
import { Request } from 'express';

import 'reflect-metadata';

@injectable()
@Controller('/user')
export class UserController {

  constructor(@inject('UserService') private userService: UserService) { }

  @Get('/')
  public getUsers(): IUser[] {
    return this.userService.getUsers();
  }

  @Get('/:id')
  public getUser(request: Request): IUser {
    return this.userService.getUser(request.params.id);
  }

  @Post('/')
  public newUser(request: Request): IUser {
    return this.userService.newUser(request.body);
  }

  @Put('/:id')
  public updateUser(request: Request): IUser {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @Delete('/:id')
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }
}
