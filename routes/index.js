const routes = require('express').Router();

const myController = require('../controllers');
routes.get('/', myController.myFunction);

module.exports = routes;