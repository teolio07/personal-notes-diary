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
const whitelist = ['http://localhost:3001']
const options = {
    origin: (origin, callback)=>{
        if(whitelist.includes(origin) !== -1){ 
            callback(null, true); 
        }else{ 
            callback(new Error('no permitido'))
        }
    }
}
app.use(cors(options))



//routing
routerApi(app);

//middlewares
//app.use(boomErrorHandler)


//run server
app.listen(port,()=> {console.log(`Running API port ${port}`)})
