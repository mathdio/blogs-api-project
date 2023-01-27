const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
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

module.exports = {
  createPost,
};