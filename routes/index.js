const routes = require('express').Router()

const myController = require('../controllers')

routes.get('/', myController.displayName)

module.exports = routes
