const mongoose = require('mongoose');


const commentUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    email: { 
        type: String,
        required: true,
        min: 6,
        max: 255

    },

    comment: {
        type:String,
        required:true,
        min: 6,
        max: 255
    },

    dateComment:{
        type: Date,
        default: Date.now
        
    },
    dateUpdateComment:{
        type:Date
    }

})


const commentsSchemas = mongoose.model('commentsUsers', commentUserSchema)
module.exports = commentsSchemas;
