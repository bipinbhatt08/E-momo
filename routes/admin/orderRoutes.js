const { getOrders } = require("../../controller/admin/order/orderController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const { catchAsync } = require("../../services/catchAsync")

const router = require("express").Router()

router.route("/").get(isAuthenticated,catchAsync(getOrders))

module.exports = router