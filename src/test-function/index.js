'use strict';

var uuid = require('node-uuid');

exports.handler = (request, context, callback) => {
  console.log('uuid:', uuid.v4());
  context.succeed();
};