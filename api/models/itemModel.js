"use strict";

const mongoose = require(appRoot + '/lib/mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
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
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  categoryTitle: {
    type: String
  }
});

itemSchema.statics.updateCategoryTitle = function updateCategoryTitle(id, title) {
  const searchQuery = {_id: id},
    updateQuery = {categoryTitle: title},
    options = {multi: true};

  return this.update(searchQuery, updateQuery, options);
};

module.exports.Item = mongoose.model('Item', itemSchema);