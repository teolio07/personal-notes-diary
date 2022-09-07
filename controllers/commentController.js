const commentsService = require('./../services/commentsServices');
const service = new commentsService();
const Joi = require('joi')

//validate data get notes
const schemaGetNotes = Joi.object({
    email:Joi.string().min(6).max(255).required().email()
});

//validate data for create comments
const schemaCreateMessage = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    body: Joi.string().min(1).max(255).required()
})

//validate data for update comments
const schemaUpdateComment= Joi.object({
    title: Joi.string().min(1).max(255).required(),
    idNote: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    body: Joi.string().min(1).max(255).required()
}) 

//validate data fot delete comments 
const schemaDeleteComment = Joi.object({
    idNote: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email()
})

const getComments = (req,res)=>{
    const {email} = req.params;
    let validateData = {email:email}
    const {error} = schemaGetNotes.validate(validateData);
    if(error){
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    
    try{

        let readComments = service.readComments(validateData);
        readComments.then((response)=>{
            
            res.json(response)
        })
        
    
    }
    catch(error){
        console.log(error);
        res.send('Server error')
    }
}

const createCommnent = (req,res)=>{
    
    //validate data create comment
    const { error } = schemaCreateMessage.validate(req.body);
    
    if(error){
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }


    try{
        let title = req.body.title;
        let email = req.body.email;
        let body = req.body.body;
        
        const saveComment = service.createCommnent(title,email,body)
        saveComment.then((response)=>{ 
            if(response.isBoom == true){
                return res.status(response.output.payload.statusCode).json(response.output.payload);
            }else{
                res.json(response) 
            }
            
        })   
    }
    catch(error){
        console.log(error)
        res.send('Server error')
    }
}

const updateComment = (req,res)=>{
    const { error } = schemaUpdateComment.validate(req.body)
    if(error) {
        return res.status(400).json( 
            {error: error.details[0].message}
        )
    }

    try{
        let newNote = req.body;
        let idNote = req.body.idNote;
        let updateNote = service.updateComment(idNote,newNote);
        updateNote.then((response)=>{
            if(response.isBoom == true){
                return res.status(response.output.statusCode).json(response.output.payload);
            
            }
            res.status(200).json(response)
            
        })
        
    } 
    catch(error){
        console.log(error) 
        res.send('Server error')
        
    }
} 

const deleteComment = (req,res)=>{
    try{
        const { idNot, emailUser } = req.params
        

        let validateData = {idNote:idNot,email: emailUser}
        const { error } = schemaDeleteComment.validate(validateData) 
        if(error) {
            return res.status(400).json( 
                {error: error.details[0].message}
            )
        }
        let idComment = validateData.idNote;
        let email = validateData.email;
        let deleteComment = service.deleteComment(idNot, email)
        deleteComment.then((response)=>{
            if(response.isBoom == true){
                return res.status(response.output.statusCode).json(response.output.payload);
            
            } 
            res.json(response)
        })
    }
    catch(error){
        console.log(error)
        res.send('Server error')
    } 
}


module.exports = {
    getComments,
    createCommnent,
    updateComment,
    deleteComment
}
