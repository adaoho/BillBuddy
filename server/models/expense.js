"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.Group, { foreignKey: "GroupId" });
    }
  }
  Expense.init(
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
      expense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Expense can't be null`,
          },
          notEmpty: {
            msg: `Expense can't be empty`,
          },
        },
      },
      date: DataTypes.DATEONLY,
      GroupId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
