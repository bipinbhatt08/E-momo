const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()
// tell nodejs to use dotenv
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//telling nodejs to give access to uploads folder
app.use(express.static("uploads"))

// database connect
connectDatabase()


// ROutes here
const authRoute= require("./routes/auth/authRoutes")
const productRoute= require("./routes/admin/productRoutes")
const adminUsersRoute= require("./routes/admin/adminUsersRoutes")
const userReviewRoute = require("./routes/user/userReviewRoutes")
const profileRoute  = require("./routes/user/profileRoutes")
const cartRoute = require("./routes/user/cartRoutes")


// test api to check if server is live or not
app.get('/',(req,res)=>{
    res.json({
        status : 200,
        message: "I am alive"
    })
})

app.use("/api/auth",authRoute)//yo middleware ho
// jastai /register aayo vane: ""+"/register hunxa" ani /register vanne ma khulxa
// if app.user("/ok", ) vako vaye : /ok/register hunthyo

app.use("/api/products",productRoute)
app.use("/api/admin",adminUsersRoute)
app.use("/api/reviews",userReviewRoute)
app.use("/api/profile",profileRoute)
app.use("/api/cart",cartRoute)
//listen server

app.listen(process.env.PORT,()=>{
    console.log("Server has started at port number " + process.env.PORT)
})
