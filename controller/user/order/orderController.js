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

exports.updateMyOrder = async(req,res)=>{
    const userId = req.user.id
    const id = req.params.id
    const {totalAmount,shippingAddress,paymentDetails,items} = req.body
    if(!totalAmount || !shippingAddress || !paymentDetails || !items.length>0){
        return res.status(400).json({
            message: "Please provide totalAmount,shippingAddress,paymentDetails, and items"
        })
    }
    const myOrder = await Order.findOne({_id:id,user:userId})
    if(!myOrder){
        return res.status(404).json({
            message: "No orders found"
        })
    }
    if(myOrder.orderStatus === "ontheway"){
        return res.status(400).json({
            message: "You can not edit your order when it is on the way"
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(id,{
        totalAmount,
        shippingAddress,
        paymentDetails,
        items  
    },{new:true})
    res.status(200).json({
        message: "Order is updated",
        data: updatedOrder
    })
}

exports.deleteMyOrder = async(req,res)=>{
    const userId = req.user.id
    const id = req.params.id
    const orderExist = await Order.findOne({_id:id,user:userId})
    if(!orderExist){
        return res.status(404).json({
            message: "No order found"
        })
    }
    // if(orderExist.orderStatus == "ontheway"){
    //     return res.status(400).json({
    //         message: "You can not delete your order when it is on the way"
    //     })
    // }
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message: "Order Deleted successfully",
        data: null
    })
}

exports.cancelOrder = async (req,res)=>{
    const userId = req.user.id
    const {id} = req.body

    // check if order exists
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message: "Order not found of that id"
        })
    }
    // order garne user le cancel garirako xa
    if(userId !== order.user){
        return res.status(400).json({
            message: "You donot have order to change status"
        })
    }
    if(order.orderStatus!=="pending"){
        return res.status(400).json({
            message: "You can not cancel order as it is not pending"
        })
    }
    await Order.findByIdAndUpdate(id,{
        orderStatus: "cancelled"
    })
    res.status(200).json({
        message: "Order cancelled successfully"
    })


}

