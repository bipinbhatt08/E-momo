const { createProduct, getProducts, getProduct } = require("../controller/admin/product/productController")
const isAuthenticated = require("../middleware/isAuthenticated")
const { restrictTo } = require("../middleware/restrictTo")

const router = require("express").Router()
const{multer,storage}= require('../middleware/multer')
const { catchAsync } = require("../services/catchAsync")
const upload = multer({ storage: storage });
router.route("/products").post(isAuthenticated,restrictTo("admin"),upload.single('productImage'),catchAsync(createProduct)).get(catchAsync(getProducts))
router.route("/product/:id").get(catchAsync(getProduct))
module.exports = router 