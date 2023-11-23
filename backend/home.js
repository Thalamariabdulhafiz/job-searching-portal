const express = require("express")
const router = express.Router()
const cookieparser = require("cookie-parser")
router.use(cookieparser())

require("..//backend/databaseconn")



router.use(express.static(__dirname + "/templates"))



router.get("/", (req, res) => {
  if (!res.ok) {
    res.sendFile(__dirname + "/templates/index.html")
  } else res.end("cant fetch required page")
})

router.get("/home", (req, res) => {
  if (!res.ok) {
    res.sendFile(__dirname + "/templates/index.html")
  } else res.end("cant fetch required page")
})

router.get('/logout', (req, res) => {
 res.cookie("TToken", " ", { expires: new Date(0) })
return res.redirect("/index.html")
})
// router.get("/api-user", async (req, res) => {
//   try {
// const options = {
//   method: "GET",
//   url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
//   params: {
//     aggregateHours: "24",
//     location: "Washington,DC,USA",
//     contentType: "csv",
//     unitGroup: "us",
//     shortColumnNames: "0",
//   },
//   headers: {
//     "X-RapidAPI-Key": "8495762a16msh10cee5ce945460bp113a84jsn3e316e6f20f4",
//     "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
//   },
// }

//     try {
//       const response = await axios.request(options)
//       console.log("data from home.js", response.data)
//       const apidata = response.data
//       res.json(apidata)
//       res.render('/templates/index.html', {
//         posts:apidata
//       })
//     } catch (error) {
//       console.error('error in fetching data',error)
//     }
//     // axios.get(url, { options })
//     //   .then((res) => {
//     //     if (!res.ok) {
//     //       throw new Error('error in response data')
//     //     }
//     //     const apidata = res.data
//     //     console.log(apidata)
//     //     res.json(apidata.json)
//     //   })
//     //   .catch((err) => {
//     //   console.log("errorin fetching data",err)
//     // })
//   } catch (err) {
//     console.log("error in data 1234: ", err)
//     res
//       .status(500)
//       .send(
//         "<html> <style>.h1{font-size: 30px;text-align:center;font-family: monospace;color: black;}</style><body> <h1>Error 500 : Bad Request</h1></body></html>"
//       )
//   }
// })

module.exports = router
