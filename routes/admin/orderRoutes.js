const { getOrders, getOrder, updateOrderStatus, deleteOrder } = require("../../controller/admin/order/orderController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const { catchAsync } = require("../../services/catchAsync")
const { restrictTo } = require("../../middleware/restrictTo")

const router = require("express").Router()

router.route("/").get(isAuthenticated,catchAsync(getOrders))
router.route("/:id").get(isAuthenticated,restrictTo("admin"),catchAsync(getOrder)).patch(isAuthenticated,restrictTo("admin"),catchAsync(updateOrderStatus)).delete(isAuthenticated,restrictTo("admin"),catchAsync(deleteOrder))

module.exports = router