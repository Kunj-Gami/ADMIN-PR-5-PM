const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = express()
const port = 8080
const path = require("path")
const signupModel = require(path.join(__dirname, "Models", "AuthModel"))

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/User")

app.post("/signup", async (req, res) => {
    const { email, password } = req.body

    let existingUser = await signupModel.findOne({ email })
    if (existingUser) return res.json({ message: "user is already exist !" })

    let hashedPass = await bcrypt.hash(password, 10)

    let newUser = await signupModel.create({ email, password: hashedPass })
    res.json({message : "user created !"})


})

app.post("/login", async (req,res)=>{
    const {email,password} = req.body

    let existingUser = await signupModel.findOne({ email })
    if (!existingUser) return res.json({message : "user not found !"}) 

    let hashedPass = await bcrypt.compare(password,existingUser.password)
    if (!hashedPass) return res.json({message : "password incorrect !"})

    let token = await jwt.sign({id : existingUser._id},"user@9898",{expiresIn : "1h"})
    res.json({message : "user logged In !",token})
})

app.listen(port, () => {
    console.log("Server is running...")
})