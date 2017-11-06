"use strict";

const errorParser = (err) => {
  let statusCode;

  if (err.statusCode) {
    return err.statusCode;
  }

  if(err.name == 'ValidationError') {
    if (err.message === 'Expected type object but found type undefined') {
      statusCode = 404;
    } else {
      statusCode = 400;
    }
  } else if (err.name == 'MongoError' && err.code == 11000) {
    statusCode = 400;
  } else {
    statusCode = 500;
  }

  return statusCode;
};

module.exports = errorParser;