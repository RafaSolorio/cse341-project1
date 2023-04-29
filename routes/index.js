const routes = require('express').Router()
const contact = require('./contacts');


const myController = require('../controllers')

routes.use('/contacts', contact)
routes.get('/', myController.displayName)

module.exports = routes
