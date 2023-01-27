module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return PostCategory;
};