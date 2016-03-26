/**
 * Created by skodikara on 16/06/15.
 */
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();              // get an instance of the express Router

var port = process.env.PORT || 1999;        // set our port

// Setup the routes
require('./public/config/routes')(app,router);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('server started on port ' + port);