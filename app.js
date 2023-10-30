const express = require("express")
const { connectDatabase } = require("./database/database")
const User = require("./model/userModel")
const app = express()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// tell nodejs to use dotenv
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// database connect
connectDatabase()

// test api to check if server is live or not
app.get('/',(req,res)=>{
    res.json({
        status : 200,
        message: "I am alive"
    })
})
//user register api
app.post('/register',async(req,res)=>{
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
})

//user login api
app.post('/login', async(req,res)=>{
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
})


//listen server

app.listen(process.env.PORT,()=>{
    console.log("Server has started at port number " + process.env.PORT)
})
