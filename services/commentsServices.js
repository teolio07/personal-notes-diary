const commentUserSchema = require('../models/commentUserSchema') 
const userSchema = require('../models/userSchema')

const boom = require('@hapi/boom');


class commentsService{

    async createCommnent(title,email,body){
        try{
            let isEmailExist = await userSchema.findOne({ email }); 

            if(!isEmailExist) return (boom.badRequest('Unregistered user')) 

            let dataComment = new commentUserSchema(); 
            dataComment.title = title;
            dataComment.email = email;
            dataComment.body = body;

            await dataComment.save();
            return dataComment;
        }
        catch(error){
            console.log(error)
            return (boom.badImplementation('server error create note the user'))
        }
    } 
    
    async readComments(email){
        const notes = await commentUserSchema.find(email);
        try{
            if(!notes) return (boom.notFound('notes not found'))

            return notes;
        }
        catch(error){
            console.log(error);
            return (boom.badImplementation('Server error searching notes'))
        }
    }
    
    async updateComment(idNote,newNote){
        
        try{
            let noteById = await commentUserSchema.findById(idNote)
            if(!noteById) return (boom.notFound('note not found'))
            if(newNote.email != noteById.email) return (boom.badData('no puedes editar esta nota')) 

            let updateNote= await commentUserSchema.findByIdAndUpdate(idNote,newNote); 
            return updateNote;
        }
        catch(error){
            console.log(error);
            return (boom.badImplementation('Server error updating note'))
           
        }
        
    }

    async deleteComment(idNote,email){
        try{
            let noteById = await commentUserSchema.findById(idNote); 
            if(!noteById) return (boom.notFound('Comment not found'))
            if(email != noteById.email) return (boom.badData("You can't delete the note"))

            let noteDelete = await commentUserSchema.findByIdAndDelete(idNote)
            return noteDelete;
        }            
        catch(error){
            console.log(error)
            return (boom.badImplementation('Server error deleting note'))
        }
    }
}

module.exports = commentsService
