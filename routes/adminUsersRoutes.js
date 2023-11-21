const { getUser } = require("../controller/user/userController")
const { catchAsync } = require("../services/catchAsync")

const router = require("express").Router()
router.route("/user").get(catchAsync(getUser))

module.exports = router