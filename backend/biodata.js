const express = require("express")
const cookieparser = require("cookie-parser")
const router = express.Router()
const mongoose = require("mongoose")
const path = require("path")
const jwt = require('jsonwebtoken')
const body_parser = require("body-parser")
router.use(body_parser.json())
router.use(cookieparser())

require("..//backend/databaseconn")

const currentschema = "useriin"
const userlog = mongoose.model(currentschema)

router.get("/profile", (req, res) => {
  if (!res.ok) {
    res.sendFile(__dirname + "//templates/profile.html")
  } else res.end("cant fetch required page")
})


var auth  = async(req, res, next) => {
 
  try {
     const token = req.cookies.TToken
    console.log("token at auth in bio'", token)
    
    if (!token) {
      return res.status(403).send("<h1> error in auth</h1>")
    }

    const { user_id } = jwt.verify(token, "abcd1234abcd")
 
    
    req.user = await userlog.findById(user_id)
    console.log("user data at auth in biodata.js", req.user)
    next()
  }
  catch (err ) {
    console.log("err at auth in biodata.js",err)
  }
}

router.post("/update/:field", auth, async (req, res,next) => {
  console.log(req.body)
  
  
  let { field } = req.params
  console.log("FEILD: ",field)
  const validfileds = [
    "Image",
    "Username",
    "dateofbirth",
    "profession",
    "collegeName",
    "graduationyear",
    "cgpa",
    "courses",
    "skills",
    "address",
    "city",
    "state",
    "country",
    "pincode",
    "phoneNo",
    "weblink",
  ]
  if (validfileds.includes(field)) {
    try {
      console.log(req.body)
      const User = req.user
      console.log('ussers data at upadte biodata.js:', User)
      if (!User) {
        return console.log("not a user")
      }
     
       if (field === "Image") {
         const { Image } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { Image: Image } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
       }
      if (field === 'Username') {
        const { Username } = req.body
        const ssp = await userlog.findOneAndUpdate(
          { _id: User._id },
          { $set: { Username: Username } },
          { new: true }
        )
        if (!ssp) {
          res
            .status(500)
            .send(
              "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
            )
        }
      }

      if (field === 'dateofbirth') {
        const { dateofbirth } = req.body
        const ssp = await userlog.findOneAndUpdate(
          { _id: User._id },
          { $set: { dateofbirth: dateofbirth } },
          { new: true }
        )
        if (!ssp) {
          res
            .status(500)
            .send(
              "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
            )
        }
      }
      if (field === 'profession') {

        const {profession} = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { profession: profession } },
           { new: true }
        )
        if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
        }
      }
      if (field === 'collegeName') {
         const { collegeName } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { collegeName: collegeName } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'graduationyear') {
        const { graduationyear } = req.body
        const ssp = await userlog.findOneAndUpdate(
          { _id: User._id },
          { $set: { graduationyear: graduationyear } },
          { new: true }
        )
        if (!ssp) {
          res
            .status(500)
            .send(
              "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
            )
        }
      }
      if (field === 'cgpa') {
        const { cgpa } = req.body
        const ssp = await userlog.findOneAndUpdate(
          { _id: User._id },
          { $set: { cgpa: cgpa } },
          { new: true }
        )
        if (!ssp) {
          res
            .status(500)
            .send(
              "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
            )
        }
      }
      if (field === 'courses') {
         const { courses } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { courses: courses } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'skills') {
         const { skills } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { skills: skills } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'address') {
        const { address } = req.body
        const ssp = await userlog.findOneAndUpdate(
          { _id: User._id },
          { $set: { address: address } },
          { new: true }
        )
        if (!ssp) {
          res
            .status(500)
            .send(
              "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
            )
        }
      }
      if (field === 'city') {
         const { city } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { city: city } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'state') {
         const { state } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { state: state } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'country') {
         const { country } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { country: country } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'pincode') {
         const { pincode } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { pincode: pincode } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'phoneNo') {
         const { phoneNo } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { phoneNo: phoneNo } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
      if (field === 'weblink') {
         const { weblink } = req.body
         const ssp = await userlog.findOneAndUpdate(
           { _id: User._id },
           { $set: { weblink: weblink } },
           { new: true }
         )
         if (!ssp) {
           res
             .status(500)
             .send(
               "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated in fields error</h1></body></html>"
             )
         }
      }
     return res.redirect('/biopage.html')
    }
   
    catch (err) {
      console.log("error: ", err)
      res
        .status(500)
        .send(
          "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated</h1></body></html>"
        )
    }
  } else {
    console.log('not present in field')
     res
       .status(500)
       .send(
         "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated</h1></body></html>"
       )
  }
})


router.get("/api/data", async (req, res) => {
  try {
    console.log("token : ", req.cookies.TToken)
    const { user_id } = jwt.verify(req.cookies.TToken, "abcd1234abcd")
    const User = await userlog.findById(user_id)
    console.log("user data at biodata js in /api/data:", User)
    res.json(User)
  } catch (err) {
    console.log("error ocuured in biodata.js", err)
     res
       .status(500)
       .send(
         "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request user Not Updated</h1></body></html>"
       )
  }
})

module.exports = router
