"use strict";

const mongoose = require(appRoot + '/lib/mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 150
  },
  created: {
    type: Date,
    default: Date.now
  }
});

categorySchema.statics.getCategory = function getCategory(_id) {
  if (_id) {
    return CategoryModel.findOne({_id})
  } else {
    return Promise.resolve({_id: null, title: null});
  }
}

module.exports.Category = mongoose.model('Category', categorySchema);