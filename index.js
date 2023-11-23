const express = require("express")
const cookieparser = require("cookie-parser")
const port = 5000
const cors = require("cors")
const body_parser = require("body-parser")
const app = express()

app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use(cookieparser())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/templates"))


const home = require("./backend/home")
const signup = require("./backend/signup")
const signin = require("./backend/signin")
const bio = require("./backend/biodata")
app.use(home)
app.use(signup)
app.use(signin)
app.use(bio)


app.listen(port, () => {
  console.log("server start at " + port)
})

