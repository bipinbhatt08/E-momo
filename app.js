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
const authRoute= require("./routes/authRoutes")
const productRoute= require("./routes/productRoutes")
const adminUsersRoute= require("./routes/adminUsersRoutes")


// test api to check if server is live or not
app.get('/',(req,res)=>{
    res.json({
        status : 200,
        message: "I am alive"
    })
})

app.use("/api",authRoute)//yo middleware ho
// jastai /register aayo vane: ""+"/register hunxa" ani /register vanne ma khulxa
// if app.user("/ok", ) vako vaye : /ok/register hunthyo

app.use("/api",productRoute)
app.use("/api",adminUsersRoute)

//listen server

app.listen(process.env.PORT,()=>{
    console.log("Server has started at port number " + process.env.PORT)
})
