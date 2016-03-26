/**
 * Created by skodikara on 15/06/15.
 */
var testController = require('../app/controllers/testController');

module.exports = function(app,router) {

// middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        next(); // make sure we go to the next routes and don't stop here
    });

// test route to make sure everything is working (accessed at GET http://localhost:1999/api)
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

// more routes for our API will happen here

    //router.get('/test',testController.getTest);
    //router.get('/translate',testController.getTranslated);
    router.post('/translate',testController.getTranslated);


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
    app.use('/api', router);


};