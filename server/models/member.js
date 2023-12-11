"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.Group, { foreignKey: "GroupId" });
    }
  }
  Member.init(
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
        validate: {
          notNull: {
            msg: `Email can't be null`,
          },
          notEmpty: {
            msg: `Email can't be empty`,
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "unpaid",
      },
      GroupId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
