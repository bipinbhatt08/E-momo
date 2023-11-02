const User = require("./model/userModel")
const bcrypt = require("bcryptjs")
const adminSeeder=async()=>{
    //  admin seeding
const isAdminExists = await User.find({userEmail:"admin@gmail.com",role:"admin"})
if(isAdminExists.length>0){
    return console.log("Admin already seeded.")
}
await User.create({
    username: "admin",
    userEmail: "admin@gmail.com",
    userPassword : bcrypt.hashSync("admin",10),
    userPhoneNumber: "9810779998",
    role : "admin"
})
console.log("Admin  seeded successfully!")
}
module.exports=adminSeeder