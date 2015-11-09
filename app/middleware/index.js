var express = require('express');
var bodyParser = require('body-parser');

var accessControls = require('./access-controls');
var loadDatabase   = require('./sequelize');
var bearerToken = require('express-bearer-token');
var userFromToken  = require('./user-from-token');

module.exports = function(app) {

  // Allow JSON and URL-encoded bodies
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));

  // Allow static assets
  app.use(express.static('public'));

  // Access control
  app.use(accessControls);

  // Load the models and their relations
  app.use(loadDatabase);

  app.use(bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token'
  }));
  app.use(userFromToken);
};