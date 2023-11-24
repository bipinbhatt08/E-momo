const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema  = new Schema({
    userId : {
        type : Schema.Types.ObjectId, //cluste ma hune id ko type chai yo ho : Schema.Types.ObjectId
        ref : "User",
        requried: [true, " A review must belong to user "]
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref: "Product",
        required: [true, " A review must be of  product "]
    },
    rating : {
        type : Number,
        required : true,
        default : 3
    },
    message : {
        type : String,
        required : true,
        
    }
})

const Review = mongoose.model("Review",reviewSchema)
// Alternative 
// module.exports = mongoose.model("Blog",blogSchema)
module.exports = Review