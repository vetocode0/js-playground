const express = require("express");
const app = express();
const port = 3000;
const logger = require('morgan')    //Logger
const sampleRoutes = require('./routers/sampleRouter')

app.use(logger('dev'))  //Add logger middleware to the request pipeline
app.use('/sample', sampleRoutes); //Add custom routes middleware to /sample routes

app.get('/', function (req, res) {
    res.send('Default route reached')
})
app.listen(port, function () {
    console.log(`Custom router listening on port ${port}.`)
})


