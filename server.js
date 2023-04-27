const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('./db/connect')
const contactRoutes = require('./routes/contacts')

const port = process.env.PORT || 3000
const app = express()

//app.use('/', require('./routes'));
app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
    })
    .use('/', require('./routes')) //// works withouth index?
    .use('/contacts', contactRoutes)
//.use('/contacts/:name', contactRoutes);

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port)
        console.log(`Connected to DB and listening on ${port}`)
    }
})
