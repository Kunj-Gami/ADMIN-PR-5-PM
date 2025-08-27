const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = express()
const port = 8080
const path = require("path")
const signupModel = require(path.join(__dirname,"Models","AuthModel"))

app.use(express.json())
app.use(cors())

mongoose.connect("")

app.post("/signup", async (req,res)=>{
    const {email,password} = req.body
    
    
})

app.listen(port,()=>{
    console.log("Server is running...")
})