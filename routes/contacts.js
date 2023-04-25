const express = require('express');

const myController = require('../controllers');

const router = express.Router();

// GET /feed/posts
///return all of the documents in your contacts collection.
router.get('/', myController.getContacts);

// return a single document from your contacts collection where an id matches the id from a query parameter
router.get('/:id', myController.getContactById);

module.exports = router;