const express = require('express')

const myController = require('../controllers')

const router = express.Router()

// GET /feed/posts
///return all of the documents in your contacts collection.
router.get('/', myController.getContacts)

// return a single document from contacts collection where an id matches the id from a query parameter
router.get('/:id', myController.getContactById)

// POST route to create a new contact
router.post('/', myController.createContact)

// PUT route to update a contact by id
router.put('/:id', myController.updateContact)

// DELETE route to delete a contact
router.delete('/:id', myController.deleteContact)

module.exports = router
