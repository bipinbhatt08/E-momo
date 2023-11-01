const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()
const { registerUser, loginUser } = require("./controller/auth/authController")
// tell nodejs to use dotenv
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// database connect
connectDatabase()


// ROutes here
const authRoute= require("./routes/authRoutes")


// test api to check if server is live or not
app.get('/',(req,res)=>{
    res.json({
        status : 200,
        message: "I am alive"
    })
})

app.use("",authRoute)//yo middleware ho
// jastai /register aayo vane: ""+"/register hunxa" ani /register vanne ma khulxa
// if app.user("/ok", ) vako vaye : /ok/register hunthyo


//listen server

app.listen(process.env.PORT,()=>{
    console.log("Server has started at port number " + process.env.PORT)
})
