"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Group, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Name can't be null`,
          },
          notEmpty: {
            msg: `Name can't be empty`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Email Already Registered`,
        },
        validate: {
          notNull: {
            msg: `Email can't be null`,
          },
          notEmpty: {
            msg: `Email can't be empty`,
          },
          isEmail: {
            msg: `Email must be in a format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5],
            msg: `Password must contain 8 Character`,
          },
          notNull: {
            msg: `Password can't be null`,
          },
          notEmpty: {
            msg: `Password can't be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
