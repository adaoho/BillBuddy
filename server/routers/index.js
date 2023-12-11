const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const groupRoute = require("./groupRoute");
const authentication = require("../middlewares/authentication");

router.use("/user", userRoute);

router.use(authentication);
router.use("/group", groupRoute);

module.exports = router;
