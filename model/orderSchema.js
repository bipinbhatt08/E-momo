 const mongoose = require("mongoose")
 const Schema = mongoose.Schema 
 const orderSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    items : [{
        quantity: {
            type: Number,
            default : 1,
            required : true,
        },
        product : {
            type:Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

    }],
    totalAmount : {
        type: Number,
        required: true
    },
    shippingAddress :{
        type : String,
        required: true
     },
    orderStatus: {
        type : String,
        enum : ["pending","delivered","cancelled","ontheway","preparation"],
        default: "pending"
        },
    paymentDetails: {
        method:{
            type:String,
            enum:['COD','khalti']
        },
        paymentStatus: {
            type: String,
            enum: ["paid","unpaid","pending"],
            default: "unpaid"
        }
    },
 },
 {
    timestamps: true
 })

 const Order = new mongoose.model("Order",orderSchema)
 module.exports = Order