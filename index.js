//Dependencias
const express = require('express')
const app = express();
require('dotenv').config()
const cors = require('cors')

//Environment variables
const port = process.env.PORT || 3002

//database
require ('./database/db')

//modules
const routerApi = require('./routes')
const { boomErrorHandler } = require('./middlewares/errorHandler')

//settings
app.use(express.static("public"))
app.use(express.json())

//cors
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors())



//routing
routerApi(app);

//middlewares
//app.use(boomErrorHandler)


//run server
app.listen(port,()=> {console.log(`Running API port ${port}`)})
