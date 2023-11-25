const mongoose = require("mongoose")
const { reviewSchema } = require("./nextReviewModel")
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

    },
    productImage : {
        type : String,
    },
    // reviews : [reviewSchema] //yo chaine second way ko lagi ho
    

} ,{
    timestamps:true
} )

const Product = mongoose.model("Product",productSchema)

module.exports = Product