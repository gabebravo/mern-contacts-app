const express = require('express');
const router = express.Router();

const Contact = require('../schemas/contact');

const getConnected = (req, res) => {
  res.send({ message: 'most basic get route'});
}

/*

1. POST route : creates a component

2. GET route : gets all contacts

3. PUT route : update a contact

4. DELETE route : delete a contact

*/ 

// tester
router.get('/start', getConnected);

// routes
// router.post('/create', createDrivers);
// router.put('/edit', editDriver);
// router.delete('/delete', deleteDriver);
// router.get('/', getDrivers);

//export routes
module.exports = router;