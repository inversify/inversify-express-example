import { expect } from 'chai';
import { injectable, Kernel } from 'inversify';

describe('UserService', () => {
  let service;

  beforeEach(() => {
    let kernel = new Kernel();
    kernel.bind<MongoDBClientMock>('MongoDBClient').to(MongoDBClientMock);

    service = require('../../bootstrap');
  });

  it('could work', () => {
    expect(true).to.be.true;
  });
});

@injectable()
class MongoDBClientMock {
  public db;

  constructor() {
    console.log('asdsad');
  }

  public find() {
    return [{
      email: 'lorem@ipsum.com',
      name: 'Lorem'
    }, {
        email: 'doloe@sit.com',
        name: 'Dolor'
      }];
  }

  public findOne() {
    return {
      email: 'lorem@ipsum.com',
      name: 'Lorem'
    };
  }

  public findOneById() { }
  public insert() { }
  public update() { }
  public remove() { }
}
