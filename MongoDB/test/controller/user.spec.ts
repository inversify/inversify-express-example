import { expect } from 'chai';
import { UserController } from '../../controller/user';
import { UserService } from '../../service/user';

class MongoDBClientMock {
  public db;

  public find(collection, filter, result: (error, data) => void) {
    return result(null, [{
      email: 'lorem@ipsum.com',
      name: 'Lorem'
    }, {
        email: 'doloe@sit.com',
        name: 'Dolor'
      }]);
  }

  public findOneById(collection, objectId, result: (error, data) => void) {
    return result(null, {
      email: 'lorem@ipsum.com',
      name: 'Lorem'
    });
  }

  public insert(collection, model, result: (error, data) => void) {
    return result(null, {
      email: 'test@test.com',
      name: 'test'
    });
  }

  public update(collection, objectId, model, result: (error, data) => void) {
    return result(null, {
      email: 'changed@changed.com',
      name: 'Lorem'
    });
  }

  public remove(collection, objectId, result: (error, data) => void) {
    return result(null, 'Lorem');
  }
}

describe('UserController', () => {
  let controller;

  beforeEach(() => {
    controller = new UserController(new UserService(new MongoDBClientMock()));
  });

  it('should get back all user', (done) => {
    controller.getUsers().then((data) => {
      expect(data).to.deep.equal(
        [{
          email: 'lorem@ipsum.com',
          name: 'Lorem'
        }, {
            email: 'doloe@sit.com',
            name: 'Dolor'
          }]
      );

      done();
    });
  });

  it('should give back the right user', (done) => {
    controller.getUser({
      params: {
        id: 'Lorem'
      }
    }).then((data) => {
      expect(data).to.deep.equal({
        email: 'lorem@ipsum.com',
        name: 'Lorem'
      });

      done();
    });
  });

  it('should add a new user', (done) => {
    controller.newUser({
      body: {
        email: 'test@test.com',
        name: 'test'
      }
    }).then((result) => {
      expect(result).to.deep.equal({
        email: 'test@test.com',
        name: 'test'
      });

      done();
    });
  });

  it('should update a existing user', (done) => {
    controller.updateUser({
      body: {
        email: 'changed@changed.com',
        name: 'Lorem'
      }, params: {
        id: 'Lorem'
      }
    }).then((result) => {
      expect(result).to.deep.equal({
        email: 'changed@changed.com',
        name: 'Lorem'
      });

      done();
    });
  });

  it('should delete a user', (done) => {
    controller.deleteUser({
      params: {
        id: 'Lorem'
      }
    }).then((result) => {
      expect(result).to.equal('Lorem');
      done();
    });
  });
});
