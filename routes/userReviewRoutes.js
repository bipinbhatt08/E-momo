const { getProductReview, deleteReview, createReview } = require("../controller/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const { catchAsync } = require("../services/catchAsync")

const router = require("express").Router()
router.route("/review/:id").post(isAuthenticated, catchAsync(createReview)).delete(isAuthenticated, catchAsync(deleteReview)).get(isAuthenticated, catchAsync(getProductReview))


module.exports = router