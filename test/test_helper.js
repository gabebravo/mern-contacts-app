const mongoose = require('mongoose');

before( done => {
  mongoose.connect('mongodb://admin:password@ds161742.mlab.com:61742/contacts_db',  {
    useMongoClient: true, // weird new flag mongoose requires
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error);
    })
});

beforeEach( done => {
  const contacts = mongoose.connection.collections.contacts;
    contacts.drop()
      .then(() => done())
      .catch(() =>  done());
});