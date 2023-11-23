const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require("path")
const cookieparser = require('cookie-parser')
const body_parser = require("body-parser")
router.use(body_parser.json())
router.use(cookieparser())

require("..//backend/databaseconn")


const currentschema = "useriin"

if (!mongoose.modelNames().includes(currentschema)) {
  const useriin = new mongoose.Schema({
    Image: String,
    Username: String,
    Email: String,
    Password: String,
    dateofbirth: String,
    profession: String,
    collegeName: String,
    graduationyear: String,
    cgpa: String,
    courses: String,
    skills: String,
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    phoneNo: String,
    weblink: String,
  })
  mongoose.model(currentschema, useriin)
}

const useriin = mongoose.model(currentschema)

router.get("/sign-up", (req, res) => {
  if (!res.ok) {
    res.sendFile(__dirname + "//templates/sign-up.html")
  } else res.end("cant fetch required page")
})

router.post("/signup", async (req, res) => {
  try {
    const { Username, Email, Password, RePassword } = req.body
    console.log(req.body)
    const user = await useriin.findOne({ Email: Email })
    if (user) {
      res
        .status(500)
        .send(
          "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : User Alredy exist</h1></body></html>"
        )
    } else {
      if (Password !== RePassword) {
        res
          .status(500)
          .send(
            "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Enter Correct Password and Repassword</h1></body></html>"
          )
      } else {
        const salt = await bcrypt.genSalt(14)
        const hashh = await bcrypt.hash(Password, salt)
        console.log(hashh)
        const newuser = new useriin({
          Image:'',
          Username: Username,
          Email: Email,
          Password: hashh,
          dateofbirth: "",
          profession: "",
          collegeName: "",
          graduationyear: "",
          cgpa: "",
          courses: "",
          skills: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          phoneNo: "",
          weblink: "",
        })
        await newuser.save()
        const saved_user = await useriin.findOne({ Email: Email }) 
        console.log('id: ',saved_user._id)
        const token = jwt.sign({ user_id: saved_user._id }, 'abcd1234abcd', { expiresIn: '30d' })
        // localStorage.setItem('jwtToken',token)
      //  const ttn =  res.json(token)
        const page = path.join(__dirname, "..", "templates", "profile.html")
        res.cookie("TToken",token)
        // req.session.user_id = saved_user._id
        return res.sendFile(page)
      }
    }
    
  } catch (err) {
    console.log("error occured at signup page: ", err)
    res
      .status(500)
      .send(
        "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request</h1></body></html>"
      )
  }
})

module.exports = router
