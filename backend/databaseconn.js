const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/practice")

const conn = mongoose.connection
conn.once('open', () => {
  console.log('db connection success')
})

conn.on('error', (err) => {
  console.log('err'+err)
})





// const userschema = new mongoose.Schema({
//   _id: Number,
//   item: String,
//   qty: Number,
// })

// const pract1 = mongoose.model('pract1',userschema)

// pract1.find({})
//   .then(data => {
//      console.log("data: ",data)
//   })
//   .catch(err => {
//      console.log("error",err)
//   })

