import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { User } from '../models/user';
import { UserService } from '../service/user';
import TYPES from '../constant/types';

@controller('/user')
export class UserController {

  constructor( @inject(TYPES.UserService) private userService: UserService) { }

  @httpGet('/')
  public getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @httpGet('/:id')
  public getUser(request: Request): Promise<User> {
    return this.userService.getUser(request.params.id);
  }

  @httpPost('/')
  public newUser(request: Request): Promise<User> {
    return this.userService.newUser(request.body);
  }

  @httpPut('/:id')
  public updateUser(request: Request): Promise<User> {
    return this.userService.updateUser(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): Promise<any> {
    return this.userService.deleteUser(request.params.id);
  }
}
