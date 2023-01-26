const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory };
};

const findAll = async () => {
  const result = await Category.findAll();

  return { type: null, message: result };
};

module.exports = {
  createCategory,
  findAll,
};