const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema  = new Schema({
    productName : {
        type : String,
        required : [true,"ProductName must be provided"]
    },
    productDescription : {
        type : String,
        required : [true,"ProductDescription must be provided"]
    }, 
    productPrice : {
        type : Number,
        required : [true,"ProductPrice must be provided"]
    }, 
    productPrice : {
        type : Number,
        required : [true,"ProductPrice must be provided"]
    }, 
    productStockQty: {
        type : Number,
        required : [true, "Product Quantity must be provided"]
    },
    productStatus : {
        type: String,
        required : [true, "Product status must be provided"]

    }
    

} ,{
    timestamps:true
} )

const Product = mongoose.model("Product",productSchema)

module.exports = Product