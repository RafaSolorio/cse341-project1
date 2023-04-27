const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

// Displays name when home route is requested
const displayName = (req, res, next) => {
    res.send('Dylan Solorio')
}

// Return all of the documents in your contacts collection.

const getContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find()
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists)
    })
}

// Return a single document from contacts collection where an id matches the id from a query parameter
const getContactById = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id)
    const result = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .find({ _id: contactId })
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists)
    })
}

const createContact = async (req, res, next) => {
    try {
        const collection = mongodb.getDb().db().collection('contacts')

        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        }

        const result = await collection.insertOne(newContact)

        res.status(201).json({ id: result.insertedId })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error internal')
    }
}

const updateContact = async (req, res, next) => {
    try {
        const id = req.params.id;
        const collection = mongodb.getDb().db().collection('contacts');
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        const contactId = new ObjectId(id)
  
        const result = await collection.updateOne(
            { _id: contactId },
            { $set: { firstName, lastName, email, favoriteColor, birthday } }
        );
  
        if (result.modifiedCount === 1) {
            return res.status(204).json({ message: 'Contact updated successfully.' });
        }
  
        return res.status(404).json({ message: 'Contact not found.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

const deleteContact = async (req, res) => {
    try {
        const collection = mongodb.getDb().db().collection('contacts');

        const contactId = new ObjectId(req.params.id)
  
        const result = await collection.deleteOne({ _id: contactId });
  
        if (result.deletedCount === 1) {
            return res.status(200).send();
        }

        return res.status(404).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error internal');
    }
}

module.exports = {
    displayName,
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
}
