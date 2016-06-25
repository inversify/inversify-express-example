import { injectable } from 'inversify';

interface IUser {
  email: string;
  name: string;
  _id?: string;
}

@injectable()
export class User implements IUser {
  constructor(
    public email: string,
    public name: string,
    public _id?: string
  ) { }
}
