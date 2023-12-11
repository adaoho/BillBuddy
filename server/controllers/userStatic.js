const {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
} = require("../helpers");
const { User } = require("../models");
const { Op } = require("sequelize");

class UserStatic {
  static async userRegister(req, res, next) {
    try {
      const { email, password, name } = req.body;

      if (!email) throw { name: `emailEmpty` };
      if (!password) throw { name: `passwordEmpty` };
      if (!name) throw { name: `nameEmpty` };

      await User.create({ name, email, password });

      res.status(201).json({
        message: `Register with ${email} succeed`,
        name: name,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: `emailEmpty` };
      if (!password) throw { name: `passwordEmpty` };

      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "InvalidLogin" };

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) throw { name: `InvalidLogin` };

      const accessToken = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      res.status(200).json({
        name: user.name,
        access_token: accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserStatic;
