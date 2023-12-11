const { Group } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.user;
    const { GroupId } = req.params;
    const userGroup = await Group.findOne({
      where: { id: GroupId },
    });

    // console.log(userGroup, "====", id, "<<< author");

    if (!userGroup) throw { name: "InvalidId" };
    if (userGroup.UserId !== id) throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
