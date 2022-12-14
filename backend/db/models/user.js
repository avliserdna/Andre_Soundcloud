'use strict';
const {
  Model, Validator
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      const { firstName, lastName, id, username, email } = this; // context will be the User instance
      return { firstName, lastName, id, username, email };
    }

    validatePassword(password_input) {
      return bcrypt.compareSync(password_input, this.password.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ firstName, lastName, username, email, password }) {
      console.log(password)
      const hashedPassword = bcrypt.hashSync(password);
      console.log(hashedPassword)
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      User.hasMany(
        models.Song, {
        foreignKey: "userId",
        onDelete: 'CASCADE'
      }
      )

      User.hasMany(
        models.Album,
        {
          foreignKey: "userId",
          onDelete: 'CASCADE'
        }
      )

      User.hasMany(
        models.Comment,
        {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        }
      )

      User.hasMany(
        models.Playlist,
        {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["password", "email", "createdAt", "updatedAt", "previewImage"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["password", "previewImage"] }
      },
      loginUser: {
        attributes: {}
      },
      artist: {
        attributes: {
          exclude: ["firstName", "lastName", "password", "email", "createdAt", "updatedAt"]
        }
      }
    }
  });
  return User;
};
