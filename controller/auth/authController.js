const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")
const { getMaxListeners } = require("nodemailer/lib/xoauth2")

// user register
exports.registerUser = async(req,res)=>{
    const {email,phoneNumber,password,username}= req.body
    // input data validation
    if(!email||!phoneNumber||!password||!username){
       return res.status(400).json({
            message: "Please provide email, phone number,username and password."
        })
    }
    // if user already exists
    const emailAlreadyExists= await User.find({userEmail:email})
    if(emailAlreadyExists.length>0){
        return res.status(400).json({
            message: "user with this email already exists"
        })
    }
    await User.create({
        username : username,
        userEmail :email,
        userPhoneNumber: phoneNumber,
        userPassword : bcrypt.hashSync(password,10)
    })
    res.status(201).json({
        message: "User is registered."
    })
    console.log(req.body)
}

// user login
exports.loginUser = async(req,res)=>{
    const {email,password}=req.body
    // validation
    if(!email||!password){
       return res.status(400).json({
            message: "Please provide email and password"
        })
    }
    // checking users existance
    const userFound= await User.find({userEmail:email})
    if(userFound.length==0){
         return res.status(400).json({
            message: "No user found"
        })
    }
    
    // password check
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword )
    
    if(isMatched){
        // generate token
        const token = jwt.sign({id : userFound[0]._id}, process.env.SECRET_KEY,
        {
            expiresIn:'30d'
        })

        res.status(200).json({
            message:"user logged in successfully",
            token : token
        })
    }else{
        res.status(404).json({
            message:"Invalid email and password"
        })
    }
}

// forgot password // send otp
exports.forgotPassword = async(req,res)=>{
    const {email}= req.body
    //email aayo ki nai
    if(!email){
        return res.status(400).json({
            message: "Please provide email"
        })
    }
    //aako email ko user xa ki nai
    const userFound = await User.find({userEmail:email})
    if(userFound.length==0){
        return res.status(404).json({
            message: "User with this email does not exist"
        }) 
    }
    //generate otp
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    
    // Send otp
    await sendEmail({
        email,
        subject: "E-momo password reset.",
        message : `Your otp is ${otp}`
    })
    userFound[0].otp=otp
    await userFound[0].save()

    res.status(200).json({
        message: "Otp send successfully!"
    })
    

}

// otp verification
exports.otpVerification = async(req,res)=>{
    const {email, otp} = req.body
    if(!email||!otp){
        return res.status(404).json({
            message : "Provide email and otp"
        })
    }
    const userFound= await User.find({userEmail:email})
    if(userFound.length==0){
         return res.status(400).json({
            message: "Email is not registered"
        })
    }

    const validOtp = userFound[0].otp
    if(validOtp!=otp){
        return res.status(404).json({
            message: "Invalid Otp"
        })
    }else{
        userFound[0].otp= undefined
        userFound[0].isOtpVerified = true
        await userFound[0].save()
        res.status(200).json({
            message: "Otp is correct"
        })
    }

}

// password change
exports.resetPassword = async(req,res)=>{
    const {email,newPassword,confirmPassword}= req.body
    if(!email || !newPassword || !confirmPassword){
        res.status(404).json({
            message: "Provide email and passwords"
        })
    }
    if(newPassword!==confirmPassword){
        res.status(404).json({
            message: "Passwords does not match"
        })
    }
    const userFound = await User.find({userEmail:email})
    if(userFound.length==0){
        res.status(404).json({
            message: "User does not exist"
        })
    }
    if(userFound[0].isOtpVerified==false){
        return res.status(403).json({
            message: "You can not perform this action"
        })
    }
    userFound[0].userPassword = bcrypt.hashSync(newPassword,10)
    userFound[0].isOtpVerified = false
    await userFound[0].save()

    res.status(200).json({
        message: "Password changed succesfully!"
    })
}