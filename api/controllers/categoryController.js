'use strict';

const CategoryModel = require("../models/categoryModel").Category,
  ItemModel = require("../models/itemModel").Item;

module.exports = {
  getCategoriesList,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
};

function getCategoriesList(req, res, next) {
  CategoryModel.find({})
    .exec()
    .then(list => res.send(list))
    .catch(err => next(err));
}

function getCategory(req, res, next) {
  const _id = req.swagger.params.id.value;

  const searchQuery = {_id};

  CategoryModel.find(searchQuery)
    .exec()
    .then(category => {
      if (!item) {
        return Promise.reject({statusCode: 404, message: "not found"});
      }

      res.send(list);
    })
    .catch(err => next(err));
}

function addCategory(req, res, next) {
  delete req.body.id;

  const categoryToSave = new CategoryModel(req.body);

  categoryToSave.save()
    .then(category => res.send(category))
    .catch(err => next(err));
}

function updateCategory(req, res, next) {
  const _id = req.swagger.params.id.value;

  let oldCategoryTitle,
    newCategory;

  const searchQuery = {_id},
    updateQuery = req.body,
    options = {new: true};

  CategoryModel.findOne(searchQuery)
    .then(category => {
      if (!category) {
        return Promise.reject({statusCode: 404, message: "not found"})
      }

      oldCategoryTitle = category.title;

      return CategoryModel.findOneAndUpdate(searchQuery, updateQuery, options)
    })
    .then(category => {
      newCategory = category;

      if (oldCategoryTitle !== category.title) {
        return ItemModel.updateCategoryTitle(category._id, category.title);
      } else {
        return Promise.resolve();
      }
    })
    .then(() => {
      res.send(newCategory);
    })
    .catch(err => next(err));
}

function deleteCategory(req, res, next) {
  const _id = req.swagger.params.id.value;

  ItemModel.deleteMany({categoryId: _id})
    .then(() => CategoryModel.findOneAndRemove({_id}))
    .then(category => {
      if (!category) {
        return Promise.reject({statusCode: 404, message: "not found"});
      }

      res.send(category);
    })
    .catch(err => next(err));
}

