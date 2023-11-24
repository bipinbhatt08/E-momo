const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema  = new Schema({
    userId : {
        type : Schema.Types.ObjectId, //cluste ma hune id ko type chai yo ho : Schema.Types.ObjectId
        ref : "User",
        requried: [true, " A review must belong to user "]
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

const NextWayReview = mongoose.model("NextWayReview",reviewSchema)
// Alternative 
// module.exports = mongoose.model("Blog",blogSchema)
module.exports = {NextWayReview, reviewSchema}