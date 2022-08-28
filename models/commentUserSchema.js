const mongoose = require('mongoose');


const commentUserSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    body:{
        type: String,
        required: true,
        min: 1,
        max: 255}
    ,

    email: { 
        type: String,
        required: true,
        min: 6,
        max: 255

    },

    dateNote:{
        type: Date,
        default: Date.now
        
    },
    dateUpdateNote:{
        type: Date
    }

})


const commentsSchemas = mongoose.model('commentsUsers', commentUserSchema)
module.exports = commentsSchemas;
