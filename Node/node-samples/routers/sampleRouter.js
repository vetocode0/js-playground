const express = require('express')
const sampleRouter = express.Router()

// This is custom middleware that is specific to this router
// The next() is required to pass control to the next
// middleware or to the actual route handler
sampleRouter.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`)
    next()
})

//define the landing page of this router
sampleRouter.get('/', (req, res) => {
    res.send('Samples home page')
})

// define a second route in the router
sampleRouter.get('/secondRoute', (req, res) => {
    res.send('Second route was hit')
})

module.exports = sampleRouter
