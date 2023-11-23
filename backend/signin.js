const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const session = require("express-session")
const { match } = require("assert")
const cookieparser = require("cookie-parser")
const body_parser = require("body-parser")
router.use(body_parser.json())
router.use(cookieparser())

require("..//backend/databaseconn")

const currentschema = "useriin"
const userlog = mongoose.model(currentschema)

router.get("/signin", (req, res) => {
  if (!res.ok) {
    res.sendFile(__dirname + "//templates/signin.html")
  } else res.end("cant fetch required page")
})

router.post("/signin", async (req, res) => {
  try {
    const matchdata = await userlog.findOne({ Email: req.body.Email })
    if (matchdata == null) {
      res
        .status(500)
        .send(
          "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Wrong Email</h1></body></html>"
        )
    } else {

      const ismatch = await bcrypt.compare(
        req.body.Password,
        matchdata.Password
      )
      if (ismatch == null) {
        res
          .status(500)
          .send(
            "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Wrong password</h1></body></html>"
          )
      } else {
        // const saved_user = await useriin.findOne({ Email: req.body.Email })
        console.log("user data at signin :", matchdata)
        console.log("matchdata id: ", matchdata._id)
        res.cookie('userid',matchdata._id)
        const token = jwt.sign({ user_id: matchdata._id }, "abcd1234abcd", {
          expiresIn: "30d",
        })
        console.log(token)
        // req.session.user_id = matchdata._id
        res.cookie("TToken", token)
        const page = path.join(__dirname, "..", "templates", "profile.html")
        return res.sendFile(page)
      }
    }
  } catch (err) {
    console.log("error: ", err)
    res
      .status(500)
      .send(
        "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request</h1></body></html>"
      )
  }
})


module.exports = router
