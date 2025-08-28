const mongoose = require("mongoose")

const signupSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
})

const signupModel = mongoose.model("User",signupSchema)

module.exports = signupModel