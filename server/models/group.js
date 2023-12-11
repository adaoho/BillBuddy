"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(models.User, { foreignKey: "UserId" });
      Group.hasMany(models.Member, { foreignKey: "GroupId" });
      Group.hasMany(models.Expense, { foreignKey: "GroupId" });
    }
  }
  Group.init(
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
      status: {
        type: DataTypes.STRING,
        defaultValue: "unpaid",
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
