'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete:'CASCADE' }),
      models.Post.hasMany(models.Comment),
      models.Post.hasMany(models.Like_post),
      models.Post.hasMany(models.Dislike_post)
    }
  };
  Post.init({
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};