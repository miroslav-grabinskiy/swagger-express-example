"use strict";

const config = require(appRoot + '/config');
const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();

const DB_NAME = "appExample";
const DOCKER_MONGODB_URI = "mongodb://mongo:27017/" + DB_NAME;
const LOCAL_MONGODB_URI = "mongodb://localhost:27017/" + DB_NAME + "?socketTimeoutMS=120000";
const myMongo = process.env.DOCKER ? DOCKER_MONGODB_URI : LOCAL_MONGODB_URI;

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test') {
  const Mockgoose = require('mockgoose').Mockgoose;
  const mockgoose = new Mockgoose(mongoose);

  mockgoose.prepareStorage().then(function() {
    mongoose.connect(myMongo, function(err) {
      console.log('connected');
    });
  });
} else {
  mongoose.connect(myMongo, config.get('mongoose:options'));
}

module.exports = mongoose;