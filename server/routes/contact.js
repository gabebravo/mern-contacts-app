const express = require('express');
const router = express.Router();

const Contact = require('../schemas/contact');

const getConnected = (req, res) => {
  res.send({ message: 'most basic get route'});
}

const createContact = (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save()
    .then( contact => {
      res.status(200).json({ 
        contact: { name: contact.name, email: contact.email },
        message: 'the contact was successfully saved'
      });
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: 'the user could not be saved' });
    });
}

const getContacts = (req, res) => {
  Contact.find({}, { _id: 0, name: 1, email: 1 })
    .then( contacts => {
      res.status(200).json(contacts);
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
}

const editContact = (req, res) => {
  Contact.findOneAndUpdate({email: req.body.email}, req.body, {new: true})
    .then( contact => {
      res.status(200).json({
        name: contact.name,
        email: contact.email
      });
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
}

const deleteContact = (req, res) => {
  Contact.findOneAndRemove({ email: req.query.email })
    .then( contact => {
      res.status(200).json(contact);
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
}

// tester
router.get('/start', getConnected);

// routes
router.post('/create', createContact);
router.get('/', getContacts);
router.put('/edit', editContact);
router.delete('/delete', deleteContact);

//export routes
module.exports = router;