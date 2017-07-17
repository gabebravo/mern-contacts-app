const mongoose = require('mongoose');

before( done => {
  mongoose.connect('mongodb://localhost/contacts_test',  {
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