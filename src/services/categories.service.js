const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory };
};

const findAll = async () => {
  const result = await Category.findAll();

  return { type: null, message: result };
};

const checkCategories = async () => {
  const categoriesList = await Category.findAll();
  return categoriesList;
};

module.exports = {
  createCategory,
  findAll,
  checkCategories,
};