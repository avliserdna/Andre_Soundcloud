'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsTo(
        models.User,
        {
          foreignKey: "userId",
          onDelete: 'CASCADE'
        }
      )

      Album.hasMany(
        models.Song,
        {
          foreignKey: 'albumId',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Album.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Album',
    scope: {
      simpleView: {
        attributes: {
          exclude: ["userId", "description", "createdAt", "updatedAt"]
        }
      }
    }
  });
  return Album;
};
