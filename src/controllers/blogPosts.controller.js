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

module.exports = {
  createPost,
};