const mongoose = require('mongoose');
mongoose.connect(process.env.URI)
    .then((res) =>{console.log("name database: "+res.connection.name)})
    .catch((e)=>{console.log('error' + e)})
