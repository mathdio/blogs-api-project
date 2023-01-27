'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.STRING, allowNull: false },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'user_id',
        references: { model: 'users', key: 'id' },
      },
      published: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
