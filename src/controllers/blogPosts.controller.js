const blogPostsService = require('../services/blogPosts.service');
const categoriesService = require('../services/categories.service');

const createPost = async (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryIds } = req.body;
  const categoriesList = await categoriesService.checkCategories(categoryIds);
  const idsList = categoriesList.map(({ id }) => id);
  const checking = categoryIds.some((category) => !idsList.includes(category));
  if (checking) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' }); 
  }
  
  const newPost = await blogPostsService.createPost(title, content, categoryIds, userId);

  return res.status(201).json(newPost);
};

const findAll = async (req, res) => {
  const { type, message } = await blogPostsService.findAll();
  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await blogPostsService.findById(id);
  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content } = req.body;

  const { type, message } = await blogPostsService.editPost(id, userId, title, content);
  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createPost,
  findAll,
  findById,
  editPost,
};