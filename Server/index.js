const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const app = express()
const port = 8080
const path = require("path")
const signupModel = require(path.join(__dirname, "Models", "AuthModel"))

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/User")

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body

    let existingUser = await signupModel.findOne({ email })
    if (existingUser) return res.json({ message: "user is already exist !" })

    let hashedPass = await bcrypt.hash(password, 10)

    let newUser = await signupModel.create({ username, email, password: hashedPass })
    res.json({ message: "user created !" })


})

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    let existingUser = await signupModel.findOne({ email })
    if (!existingUser) return res.json({ message: "user not found !" })

    let hashedPass = await bcrypt.compare(password, existingUser.password)
    if (!hashedPass) return res.json({ message: "password incorrect !" })

    let userRole = existingUser.role

    let token = await jwt.sign({ id: existingUser._id }, "user@9898", { expiresIn: "1h" })
    res.json({ message: "user logged In !", token , userRole})
})

let forgotOtpV = {}
app.post("/forgot", async (req, res) => {
    const { forgotEmail } = req.body

    let existingUser = await signupModel.findOne({ email: forgotEmail })
    if (!existingUser) return res.json({ message: "user not found !" })

    let otp = await Math.floor(100000 + Math.random() * 900000)

    forgotOtpV[forgotEmail] = otp

    let nodemailerTransport = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rwr1.kunj.gg@gmail.com",
            pass: "xwtctxssifksehzf"
        }
    })

    nodemailerTransport.sendMail({
        from: "rwr1.kunj.gg@gmail.com",
        to: forgotEmail,
        subject: "Otp for reset password.",
        text: `your otp is ${otp}`
    })


    existingUser.otp = otp
    existingUser.otpExpire = Date.now() + 5 * 60 * 1000
    existingUser.save()

    return res.json({ message: "Otp sent !", flag: true })

})

app.post("/resetpass", async (req, res) => {
    const { forgotEmail, userOtp } = req.body

    let existingUser = await signupModel.findOne({ email: forgotEmail })
    if (!existingUser) return res.json({ message: "user not found !" })

    if (existingUser.otpExpire > Date.now()) {
        let verifyOtp = await signupModel.findOne({ otp: userOtp })
        if (verifyOtp) {
             return res.json({ message: "Otp is correct !" ,forgotEmail})
        }
        else{
            return res.json({ message: "Otp is Incorrect !" })
        }
           
    }
    else{
        return res.json({message : "Otp is expried !"})
    }
})


app.post("/confirmpass", async (req, res) => {
    const { userEmail, pass1 } = req.body

    let existingUser = await signupModel.findOne({ email : userEmail})
    if (!existingUser) return res.json({ message: "user not found !" })

    let hashedPass = await bcrypt.hash(pass1,10)

    existingUser.password = hashedPass
    existingUser.otp = null
    existingUser.otpExpire = null

    console.log(existingUser)
    await existingUser.save()


    return res.json({message : "Password changed !"})
})

app.get("/home", async (req, res) => {
    let token = req.headers.authorization

    let verifiedToken = await jwt.verify(token, "user@9898")

    let user = await signupModel.findById(verifiedToken.id)
    let username = user.username

    let allUser = await signupModel.find()
    console.log(allUser)

    res.json({ message: "user verifed !", username })
})

app.listen(port, () => {
    console.log("Server is running...")
})