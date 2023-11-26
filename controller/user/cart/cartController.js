const User = require("../../../model/userModel")
const Product = require("../../../model/productModel")

// add to cart api
exports.addToCart = async(req,res)=>{
    const userId = req.user.id
    const {productId} = req.params
    if(!productId){
        return res.status(400).json({
            message: "Please provide productId"
        })
    }
    const productExists = await Product.findById(productId)
    if(!productExists){
        return res.status(404).json({
            message: "No product of this id"
        })
    }
    const user = await User.findById(userId)
    user.cart.push(productId)
    await user.save()
    res.status(200).json({
        message: "Product  added to cart succesfully "
    })

}

// get  cart items

exports.viewCart = async(req,res)=>{
    const userId = req.user.id
    // const cart = await User.findById(userId).select("cart").populate("cart")
    const cart = await User.findById(userId).populate({
        path: "cart", //kun column lai populate garna venne ho
        select : "-productStatus -createdAt -updatedAt -__v"
    })
    
    res.status(200).json({
        data : cart.cart
    })
}

// delete items from carts 
exports.deleteItems = async(req,res)=>{
    const userId = req.user.id
    const productId = req.params.productId
    const productExists = await Product.findById(productId)
    if(!productExists){
        return res.status(404).json({
            message: "No product of this id"
        })
    }
    
    const user = await User.findById(userId)
    user.cart =   user.cart.filter(pId=>pId != productId) // [1,2,3] ==> 2 ==>fiter ==> [1,3] ==> user.cart = [1,3]
    await  user.save()
    res.status(200).json({
        message: "Item deletd succesfully"
    })
}
