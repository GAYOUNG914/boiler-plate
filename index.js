const express = require('express')
const app = express()
const port = 5000



const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rowanWorks:Abcd1234@cluster0.vp01t5v.mongodb.net/',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('connected'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! as sdfasdfasf')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})