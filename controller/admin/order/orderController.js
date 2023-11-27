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