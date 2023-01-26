const categoriesService = require('../services/categories.service');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoriesService.createCategory(name);
  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createCategory,
};