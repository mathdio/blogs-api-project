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
  // const checking = await Promise.all(categoryIds.map(async (category) => {
  //   await Category.findOne({ where: { name: category } }); 
  // }));
  
  // if (checking.some((check) => check === undefined)) {
  //   return { type: 400, message: 'one or more "categoryIds" not found' };
  // }

  // return { type: null, message: '' };

  const categoriesList = await Category.findAll();
  return categoriesList;

  // return { type: null, message: '' };
};

module.exports = {
  createCategory,
  findAll,
  checkCategories,
};