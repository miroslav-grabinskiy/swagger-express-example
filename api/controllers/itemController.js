'use strict';

const ItemModel = require("../models/itemModel").Item,
  CategoryModel = require("../models/categoryModel").Category;

module.exports = {
  getItemsList,
  getItem,
  addItem,
  updateItem,
  deleteItem
};

function getItemsList(req, res, next) {
  ItemModel.find({})
    .exec()
    .then(list => res.send(list))
    .catch(err => next(err));
}

function getItem(req, res, next) {
  const _id = req.swagger.params.id.value;

  const searchQuery = {_id};

  ItemModel.find(searchQuery)
    .exec()
    .then(item => {
      if (!item) {
        return Promise.reject({statusCode: 404, message: "not found"});
      }

      res.send(list);
    })
    .catch(err => next(err));
}

function addItem(req, res, next) {
  delete req.body.id;

  CategoryModel.getCategory(req.body.categoryId)
    .then(category => {
      itemToSave.categoryId = category._id;
      itemToSave.categoryTitle = category.title;

      const itemToSave = new ItemModel(req.body);

      return itemToSave.save()
    })
    .then(item => res.send(item))
    .catch(err => next(err));
}

function updateItem(req, res, next) {
  const _id = req.swagger.params.id.value;

  ItemModel.findOne(searchQuery)
    .then(item => {
      if (!item) {
        return Promise.reject({statusCode: 404, message: "not found"})
      }

      if (item.categoryId.toString() !== req.body.categoryId) {
        return CategoryModel.findOne({_id: categoryId})
      } else {
        return Promise.resolve({_id: item.categoryId, categoryTitle: item.categoryTitle});
      }
    })
    .then(category => {
      req.body.categoryId = category._id;
      req.body.categoryTitle = category.title;

      return ItemModel.findOneAndUpdate({_id}, req.body, {new: true});
    })
    .then(updatedItem => {
      res.send(updatedItem);
    })
    .catch(err => next(err));
}

function deleteItem(req, res, next) {
  const _id = req.swagger.params.id.value;

  const searchQuery = {_id};

  ItemModel.findOneAndRemove(searchQuery)
    .exec()
    .then(item => {
      if (!item) {
        return Promise.reject({statusCode: 404, message: "not found"});
      }

      res.send(item);
    })
    .catch(err => next(err));
}

