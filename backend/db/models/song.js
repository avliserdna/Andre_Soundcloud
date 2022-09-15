'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(
        models.User,
        {
          foreignKey: 'userId'
        }
      )

      Song.belongsTo(
        models.Album,
        {
          foreignKey: 'albumId'
        }
      )

      Song.hasMany(
        models.Comment,
        {
          foreignKey: 'songId'
        }
      )

      Song.hasMany(
        models.Playlist,
        {
          through: models.PlaylistSongs
        }
      )
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
