const { getProductReview } = require("../../controller/global/globalController")
const { getMyReviews, createReview, deleteReview } = require("../../controller/user/review/reviewController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const { restrictTo } = require("../../middleware/restrictTo")
const { catchAsync } = require("../../services/catchAsync")

const router = require("express").Router()
router.route("/").get(isAuthenticated,catchAsync(getMyReviews))
router.route("/:id").post(isAuthenticated,restrictTo("user"), catchAsync(createReview)).delete(isAuthenticated, catchAsync(deleteReview)).get(isAuthenticated, catchAsync(getProductReview))


module.exports = router