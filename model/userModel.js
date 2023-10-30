const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema  = new Schema({
    userEmail : {
        type : String,
        required : [true,"userEmail must be provided"]
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
        required : [true, "userPassword must be provided"]

    },
    role:{
        type: String,
        enum: ["customer","admin"],
        default: "customer"
    }

}  )

const User = mongoose.model("User",userSchema)
// Alternative 
// module.exports = mongoose.model("Blog",blogSchema)
module.exports = User