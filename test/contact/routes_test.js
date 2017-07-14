const assert = require('assert');
const request = require('supertest');
const app = require('../../server/app');

// we do this because using mongoose like this gets around express/mocha collisions
const mongoose = require('mongoose');
const Contact = mongoose.model('contacts'); // this is the collection name

describe('Init test for mocha and routes', () => {

  it('handles a GET request to /contact', done => {
    request(app)
      .get('/contact/start')
      .end( (err, response) => {
        assert(response.body.message === 'most basic get route');
        done();
      });
  });

  it('handles POST request to create new contact at contact/create', done => {
    const testUser = new Contact({ name: 'John Doe', email: 'test@test.com'});
    request(app)
    .post('/contact/create')
    .send(testUser)
    .end( (err, response) => {
      assert(response.body.contact.name === 'John Doe');
      assert(response.body.contact.email === 'test@test.com');
      assert(response.body.message === 'the contact was successfully saved');
      done();
    });
  });

  it('handles GET request to get all contacts at contact/create', done => {
    const testUser = new Contact({ name: 'John Doe', email: 'test@test.com'});
    const testUser2 = new Contact({ name: 'Jane Doe', email: 'test2@test.com'});
    const testUser3 = new Contact({ name: 'John Snow', email: 'test3@test.com'});
    Promise.all([ testUser.save(), testUser2.save(), testUser3.save() ])
      .then( () => {
        request(app)
        .get('/contact')
        .end( (err, response) => {
          assert( response.body.length === 3 );
          assert( typeof response.body === 'object' );
          done();
        });
      });
  });

  it('handles a PUT request to /contact/edit', (done) => {
    const updateTestContact = new Contact({ name: 'John Doe', email: 'test@test.com' })
      updateTestContact.save().then( contact => {
        request(app)
          .put('/contact/edit')
          .send({ id: contact._id, email: 'test@test.com', name: 'Jane Doe' })
          .end( (err, response) => {
             assert(response.body.name === 'Jane Doe');
             assert(response.body.email === 'test@test.com');
            done();
        });
      });
  });

  it('handles a DELETE request to /contact/delete', (done) => {
    const testUser = new Contact({ name: 'John Doe', email: 'test@test.com'});
    const testUser2 = new Contact({ name: 'Jane Doe', email: 'test2@test.com'});
    const testUser3 = new Contact({ name: 'John Snow', email: 'test3@test.com'});
    Promise.all([ testUser.save(), testUser2.save(), testUser3.save() ])
      request(app)
          .delete('/contact/delete?email=test@test.com')
          .end( (err, response) => {        
            assert(response.body.contacts.length === 2);
            assert( typeof response.body.contacts === 'object' );
            assert(response.body.message === 'the contact was successfully deleted');
            Contact.findOne({ email: 'test@test.com' })
              .then( contact => {
               assert(contact === null);
            })
            done();
        });
  });

  it('handles GET request to find a single contact contact/find', done => {
    const findOneContact = new Contact({ name: 'John Doe', email: 'test@test.com' })
      findOneContact.save().then( contact => {
        request(app)
          .get(`/contact/find?id=${contact._id}`)
          .send({ id: contact._id})
          .end( (err, response) => {
             assert(response.body.name === 'John Doe');
             assert(response.body.email === 'test@test.com');
            done();
          });
      })
  });

});
