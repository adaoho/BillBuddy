const GroupStatic = require("../controllers/groupStatic");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

router.get("/", GroupStatic.getGroup);
router.post("/", GroupStatic.postGroup);
router.patch("/status/:GroupId", authorization, GroupStatic.changeStatusGroup);
router.patch(
  "/status/:GroupId/member/:MemberId",
  authorization,
  GroupStatic.changeMemberStatus
);

router.post("/member/:GroupId", GroupStatic.addMemberGroup);
router.post("/expense/:GroupId", GroupStatic.addExpenseGroup);

module.exports = router;
