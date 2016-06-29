import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import { User } from '../models/user';
import TYPES from '../constant/types';

@injectable()
export class UserService {
  private mongoClient: MongoDBClient;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient
  ) {
    this.mongoClient = mongoClient;
  }

  public getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.mongoClient.find('user', {}, (error, data: User[]) => {
        resolve(data);
      });
    });
  }

  public getUser(id: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.findOneById('user', id, (error, data: User) => {
        resolve(data);
      });
    });
  }

  public newUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.insert('user', user, (error, data: User) => {
        resolve(data);
      });
    });
  }

  public updateUser(id: string, user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.update('user', id, user, (error, data: User) => {
        resolve(data);
      });
    });
  }

  public deleteUser(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.mongoClient.remove('user', id, (error, data: any) => {
        resolve(data);
      });
    });
  }
}
