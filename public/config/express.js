/**
 * Created by skodikara on 15/06/15.
 */
var express = require('express');

module.exports = function(app) {
    app.configure(function () {
        app.use(app.router);
    });
};