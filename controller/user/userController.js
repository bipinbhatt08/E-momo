const User = require("../../model/userModel")

exports.getUser = async(req,res)=>{
    const users = await User.find()
    //if password pani chaiyema find().select("+userPassword") badhi vaye select("+userPassword","+userName")
    //if kei select garna parena vane chai  find().select("-userPassword")

    if(users.length<1){
        return res.status(400).json({
            message: "User collection is empty",
            data: []
        })
    }
    res.status(200).json({
        message: "Users fetched succesfully",
        data : users
    })
}

