const { getUser, deleteUser, getUsers } = require("../controller/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const { restrictTo } = require("../middleware/restrictTo")
const { catchAsync } = require("../services/catchAsync")

const router = require("express").Router()
router.route("/users").get(isAuthenticated,catchAsync(getUsers))
router.route("/user/:id").delete(isAuthenticated,restrictTo("admin"),deleteUser).get(isAuthenticated,restrictTo("admin"),getUser)

module.exports = router