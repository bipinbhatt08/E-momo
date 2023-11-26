const { addToCart, viewCart, deleteItems } = require("../../controller/user/cart/cartController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const { catchAsync } = require("../../services/catchAsync")

const router = require("express").Router()
router.route("/:productId").post(isAuthenticated,catchAsync(addToCart)).delete(isAuthenticated,catchAsync(deleteItems))
router.route("/").get(isAuthenticated,catchAsync(viewCart))
module.exports = router