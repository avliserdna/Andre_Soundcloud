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
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          as: "Artist"
        }
      )

      Song.belongsTo(
        models.Album,
        {
          foreignKey: 'albumId',
          onDelete: 'CASCADE'
        }
      )

      Song.hasMany(
        models.Comment,
        {
          foreignKey: 'songId',
          onDelete: 'CASCADE'
        }
      )

      Song.belongsToMany(
        models.Playlist,
        {
          through: models.PlaylistSongs,
          onDelete: 'CASCADE'
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
    modelName: 'Song'
  });
  return Song;
};