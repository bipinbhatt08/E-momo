const Order = require("../../../model/orderSchema")

exports.getOrders = async(req,res)=>{
    const orders = await Order.find()
    .populate({
        path: "items.product",
        model: "Product",
        // You can include this line if necessary
    })
    .populate({
        path: "user",
        model: "User"  // Replace "User" with the actual model name if necessary
    });

    if(!orders.length>0){
        return res.status(404).json({
            message: "No orders yet"
        })
    }
    res.status(200).json({
        message: "Order fetched successfully",
        data : orders
    })
}
exports.getOrder = async(req,res)=>{
    const id = req.params.id
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message: "Order not found of this id"
        })
    }
    res.status(200).json({
        message: "Order fetched successfullly",
        data : order
    })
}

exports.updateOrderStatus = async(req,res)=>{
    const id = req.params.id
    const {orderStatus} = req.body
    const allowedStatus = ["pending","delivered","cancelled","ontheway","preparation"]

    if(!orderStatus ||  !allowedStatus.includes(orderStatus.toLowerCase())){
        return res.status(400).json({
            message: "OrderStatus is invalid or should be provied"
        }) 
    }
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message: "Order not found of this id"
        })
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(id,{orderStatus},{new:true})
    res.status(200).json({
        message: "OrderStatus updated successfullly",
        data : updatedOrder
    })
}

exports.deleteOrder = async(req,res)=>{
    const id = req.params.id
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message: "Order not found of this id"
        })
    }
    await Order.findByIdandDelete(id)
    res.status(200).json({
        message: "Order deleted succesfully",
        data : null
    })
}