const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const createPost = async (title, content, categoryIds, userId) => {
  const t = await sequelize.transaction();
  try {
    const newPost = await BlogPost.create(
      { title, content, userId },
      { transaction: t },
    );

    await Promise.all(categoryIds.map(async (category) => {
      await PostCategory.create(
        { categoryId: category, postId: newPost.id },
        { transaction: t },
      );
    }));

    await t.commit();
    return newPost;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const findAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) return { type: 404, message: 'Post does not exist' };

  return { type: null, message: result };
};

const editPost = async (id, userId, title, content) => {
  const postToEdit = await BlogPost.findOne({ where: { id } });
  if (!postToEdit) return { type: 404, message: 'Post does not exist' };
  if (postToEdit.userId !== userId) return { type: 401, message: 'Unauthorized user' };

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: result };
};

const deletePost = async (id, userId) => {
  const postToDelete = await BlogPost.findOne({ where: { id } });
  if (!postToDelete) return { type: 404, message: 'Post does not exist' };
  if (postToDelete.userId !== userId) return { type: 401, message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id } });
  return { type: null, message: '' };
};

const findBySearch = async (searchQuery) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: searchQuery } },
        { content: { [Op.substring]: searchQuery } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) return { type: null, message: [] };

  return { type: null, message: result };
};

module.exports = {
  createPost,
  findAll,
  findById,
  editPost,
  deletePost,
  findBySearch,
};