const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema  = new Schema({
    userEmail : {
        type : String,
        required : [true,"userEmail must be provided"],
        unique: true,
        lowercase : true
    },
    username : {
        type : String,
        required : [true, "username must be provided"]

    },
    userPhoneNumber : {
        type : Number,
        required : [true, "userPhonenumber must be provided"]

    },
    userPassword : {
        type : String,
        required : [true, "userPassword must be provided"],
        select : false

    },
    role:{
        type: String,
        enum: ["customer","admin"],
        default: "customer"
    },
    otp:{
        type: Number
    },
    isOtpVerified : {
        type: Boolean,
        default : false
    },
    cart: [{
        type:Schema.Types.ObjectId,
        ref: "Product"
    }]

} ,{
    timestamps: true
} )

const User = mongoose.model("User",userSchema)
// Alternative 
// module.exports = mongoose.model("Blog",blogSchema)
module.exports = User