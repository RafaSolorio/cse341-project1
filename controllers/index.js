const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Displays name when home route is requested
const displayName = (req, res, next) =>{
    res.send('Dylan Solorio');
};


///return all of the documents in your contacts collection.

const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

/// / return a single document from your contacts collection where an id matches the id from a query parameter
const getContactById = async (req, res, next) => {
    //const course = courses.find(c => c.id === parseInt(req.params.id);
    //if (!course) res.status(404).send('Not found');
    //res.send(course);
    const contactId = new ObjectId(req.params.id);
    console.log(req.params.id)
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

module.exports = { displayName, getContacts, getContactById };