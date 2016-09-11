import { expect } from 'chai';
import { UserService } from '../../service/user';

describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  it('should get back all user', () => {
    expect(service.getUsers()).to.deep.equal(
      [{
        email: 'lorem@ipsum.com',
        name: 'Lorem'
      }, {
          email: 'doloe@sit.com',
          name: 'Dolor'
        }]
    );
  });

  it('should give back the right user', () => {
    expect(service.getUser('Lorem')).to.deep.equal({
      email: 'lorem@ipsum.com',
      name: 'Lorem'
    });
  });

  it('should add a new user', () => {
    expect(service.getUsers()).to.have.length(2);
    expect(service.newUser({
      email: 'test@test.com',
      name: 'test'
    })).to.deep.equal({
      email: 'test@test.com',
      name: 'test'
    });
    expect(service.getUsers()).to.have.length(3);
  });

  it('should update a existing user', () => {
    expect(service.updateUser('Lorem', {
      email: 'changed@changed.com',
      name: 'Lorem'
    })).to.deep.equal({
      email: 'changed@changed.com',
      name: 'Lorem'
    });
  });

  it('should delete a user', () => {
    expect(service.getUsers()).to.have.length(2);
    expect(service.deleteUser('Lorem')).to.equal('Lorem');
    expect(service.getUsers()).to.have.length(1);
  });
});
