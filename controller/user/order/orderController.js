const Order = require("../../../model/orderSchema")

exports.createOrder = async(req,res)=>{
    const userId = req.user.id
    const {totalAmount,shippingAddress,paymentDetails,items} = req.body
    if(!totalAmount || !shippingAddress || !paymentDetails || !items.length>0){
        return res.status(400).json({
            message: "Please provide totalAmount,shippingAddress,paymentDetails, and items"
        })
    }

    await Order.create({
        user: userId,
        totalAmount,
        shippingAddress,
        paymentDetails,
        items
    })
    res.status(200).json({
        message: "Order created succesfully"
    })

}

exports.getMyOrders = async(req,res)=>{
    const userId  = req.user.id
    const myOrder = await Order.find({user : userId}).populate({
        path: "items.product",
        model : "Product",
        select : "-productStockQty -createdAt -updatedAt -reviews -__v" 
    })
    if(!myOrder.length>0){
        return res.status(404).json({
            message: "No orders yet"
        })
    }
    res.status(200).json({
        message: "Order fetched successfully",
        data : myOrder
    })
}