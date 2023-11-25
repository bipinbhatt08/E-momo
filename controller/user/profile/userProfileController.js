const User = require("../../../model/userModel")

// get my profile controller 
exports.getMyProfile = async(req,res)=>{
    const userId = req.user.id 
    const myProfile = await User.findById(userId)
    // send response
    res.status(200).json({
        data : myProfile,
        message : "Profile fetched successfully"
    })
}

// update my profile controller 
exports.updateMyProfile = async(req,res)=>{
    const {username,userEmail,userPhoneNumber} = req.body 
    const userId = req.user.id 
    // update profile 
  const updatedData =   await User.findByIdAndUpdate(userId,{username,userEmail,userPhoneNumber},{
        runValidators : true,///validation jo hamle model ma required true gareko xau tyo wala
        new : true //update ko lagi api hit hanne bela fetch ko lagi arko api hit hanna napros vanera upadated data ma save garna ko lagi
    })
    res.status(200).josn({
        message : "Profile updated successfully",
        data : updatedData
    })
}

// delete my profile 
exports.deleteMyProfile = async(req,res)=>{
    const userId = req.user.id ; 
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message : "Profile delete successfully",
        data : null
    })
}


// update my password 
exports.updateMyPassword = async(req,res)=>{
    const userId = req.user.id 
    const {oldPassword,newPassword,confirmPassword} = req.body 
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message : "Please provide oldPassword,newPassword and confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "newPassword and confirmPassword do not match"
        })

    }

    // taking out the hash of the old password 
    const userData = await User.findById(userId)
    const hashedOldPassword  = userData.userPassword 


    // check if oldPassword is correct or not
    const isOldPasswordCorrect =  bcrypt.compareSync(oldPassword,hashedOldPassword)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message : "OldPassword didn't match"
        })
    }
    // matched vayo vaney 
    userData.userPassword= bcrypt.hashSync(newPassword,12)
    await userData.save()
    res.status(200).json({
        message  : "Password Changed successfully",

    })
}