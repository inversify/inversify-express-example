import { Db, MongoClient, ObjectID } from 'mongodb';
import { expect } from 'chai';
import { MongoDBClient } from '../../../utils/mongodb/client';
import { User } from '../../../models/user';

const connStr = 'mongodb://localhost:27017';
const dbName = "inversify-express-example";

describe('MongoDBClient', () => {
  let mongoClient: MongoDBClient;
  let mongoId: string;
  let driverDb: Db;

  /** Insert some testdata */
  before((done) => {
    MongoClient.connect(connStr, (err, client) => {
      const db = client.db(dbName);
      db.collection('user').drop((dropError, result) => {
        db.collection('user').insertOne({
          email: 'lorem@ipsum.com',
          name: 'Lorem'
        }, (e, insert) => {
          mongoId = insert.ops[0]._id;
          driverDb = db;
          done();
        });
      });
    });
  });

  before((done) => {
    mongoClient = new MongoDBClient();
    // let the mongodb connect
    setTimeout(() => {
      done();
    }, 1000);
  });

  it('should get back all user', (done) => {
    mongoClient.find('user', {}, (error, data) => {
      expect(error).to.be.null;

      expect(data).to.have.length(1);
      expect(data[0].email).to.be.equal('lorem@ipsum.com');
      expect(data[0].name).to.be.equal('Lorem');

      done();
    });
  });

  it('should give back the right user', (done) => {
    mongoClient.findOneById('user', mongoId, (error, data) => {
      expect(error).to.be.null;

      expect(data.email).to.be.equal('lorem@ipsum.com');
      expect(data.name).to.be.equal('Lorem');

      done();
    });
  });

  it('should add a new user', (done) => {
    mongoClient.insert('user', new User('dorem@sit.com', 'Dorem'), (error, data) => {
      expect(error).to.be.null;

      expect(data.email).to.be.equal('dorem@sit.com');
      expect(data.name).to.be.equal('Dorem');

      driverDb.collection('user').find().toArray((checkError, checkData) => {
        expect(checkData).to.have.length(2);

        driverDb.collection('user').deleteOne({ _id: new ObjectID(data._id) }, (cleanError, cleanData) => {
          done();
        });
      });
    });
  });

  it('should update a existing user', (done) => {
    mongoClient.update('user', mongoId, new User('test@ipsum.com', 'Test', mongoId), (error, data) => {
      expect(error).to.be.null;

      expect(data.email).to.be.equal('test@ipsum.com');
      expect(data.name).to.be.equal('Test');

      driverDb.collection('user').findOne({
        _id: mongoId
      }, (checkError, checkData) => {
        expect(checkData.email).to.equal('test@ipsum.com');
        expect(checkData.name).to.equal('Test');

        done();
      });
    });
  });

  it('should delete a user', (done) => {
    mongoClient.remove('user', mongoId, (error, data) => {
      driverDb.collection('user').find().toArray((checkError, checkData) => {
        expect(checkData).to.have.length(0);
        done();
      });
    });
  });
});
