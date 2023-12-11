const { Group, Member, Expense } = require("../models");
const { Op } = require("sequelize");

class GroupStatic {
  static async getGroup(req, res, next) {
    // console.log(req.user);
    try {
      const getGroup = await Group.findAll({
        where: { UserId: req.user.id },
        include: [{ model: Expense }, { model: Member }],
      });

      res.status(200).json({
        getGroup,
      });
    } catch (error) {
      next(error);
    }
  }

  static async postGroup(req, res, next) {
    try {
      const UserId = req.user.id;
      const { name } = req.body;

      const createGroup = await Group.create({
        name,
        status: "unpaid",
        UserId,
      });

      res.status(201).json({
        message: `Create Group ${name} Succeed`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addMemberGroup(req, res, next) {
    try {
      const UserId = req.user.id;
      const { GroupId } = req.params;
      const { name, email } = req.body;

      const findGroup = await Group.findByPk(GroupId);

      if (!findGroup) throw { name: "InvalId" };

      const addMember = await Member.create({
        name,
        email,
        status: "unpaid",
        GroupId,
      });

      res.status(201).json({
        message: `${name} 🚀 Added to The Group`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addExpenseGroup(req, res, next) {
    try {
      const UserId = req.user.id;
      const { GroupId } = req.params;
      const { name, expense, date } = req.body;

      const findGroup = await Group.findByPk(GroupId);

      if (!findGroup) throw { name: "InvalId" };

      const addExpense = await Expense.create({
        name,
        expense,
        date,
        GroupId,
      });

      res.status(201).json({
        message: `${name} 🚀 Added to The Group`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatusGroup(req, res, next) {
    try {
      const { status } = req.body;
      const { GroupId } = req.params;

      const updateStatus = await Group.update(
        { status: status },
        { where: { id: GroupId } }
      );

      res.status(200).json({
        message: "Group Status Has Been Updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async changeMemberStatus(req, res, next) {
    try {
      // console.log(req.params, "<<< change Member Status");

      const { GroupId, MemberId } = req.params;
      const { status } = req.body;

      const findMember = await Member.findOne({ where: { id: MemberId } });
      if (!findMember) throw { name: "InvalidId" };

      const updateStatus = await Member.update(
        { status: status },
        { where: { id: MemberId, GroupId: GroupId } }
      );

      res.status(200).json({
        message: `Member ${findMember.name} Status Has Been Updated`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GroupStatic;
