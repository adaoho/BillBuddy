const router = require("express").Router();
const UserStatic = require("../controllers/userStatic");

router.post("/login", UserStatic.userLogin);
router.post("/register", UserStatic.userRegister);

module.exports = router;
