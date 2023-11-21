const User = require("../../model/userModel")

exports.getUsers = async(req,res)=>{
    let userId = req.user.id
    let users = await User.find({_id: {$ne:userId}}) //$ne vaneko not equal

    //if password pani chaiyema find().select("+userPassword") badhi vaye select("+userPassword","+userName")
    //if kei select garna parena vane chai  find().select("-userPassword")

    if(users.length<1){
        return res.status(404).json({
            message: "User collection is empty",
            data: []
        })
    }
    res.status(200).json({
        message: "Users fetched succesfully",
        data : users
    })
}

// delte user

exports.deleteUser = async(req,res)=>{
    const id = req.params.id
    if(!id){
        return res.status(404).json({
            message: "Provide Id"
        })
    }
    const toBeDeletedUserFound = await User.find({_id:id})
    if(toBeDeletedUserFound.length==0){
        return res.status(404).json({
            message: "No user of this id"
        })
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message: "User deleted succesfully"
    })
}

//get single user
exports.getUser = async (req,res)=>{
    const id = req.params.id
    if(!id){
        return res.status(404).json({
            message: "Provide Id"
        })
    }
    const userExist = await User.find({_id:id})
    if(userExist.length==0){
        return res.status(404).json({
            message: "No users of this id"
        })
    }
    res.status(200).json({
        message: "User data fetched successfully",
        data : userExist
    })

}
