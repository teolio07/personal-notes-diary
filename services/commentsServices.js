const commentUserSchema = require('../models/commentUserSchema') 
const userSchema = require('../models/userSchema')

const boom = require('@hapi/boom');


class commentsService{

    async createCommnent(name,email,comment){
        try{
            let isEmailExist = await userSchema.findOne({ email }); 

            if(!isEmailExist) return (boom.badRequest('Unregistered user')) 

            let dataComment = new commentUserSchema(); 
            dataComment.name = name;
            dataComment.email = email;
            dataComment.comment = comment;

            await dataComment.save();
            return dataComment;
        }
        catch(error){
            console.log(error)
            return (boom.badImplementation('server error create comment the user'))
        }
    } 
    
    async readComments(){
        const comments = await commentUserSchema.find().lean()
        try{
            if(!comments) return (boom.notFound('Messages not found'))

            return comments;
        }
        catch(error){
            console.log(error);
            return (boom.badImplementation('Server error searching messages'))
        }
    }
    
    async updateComment(idComment,newComment){
        console.log(newComment)
        try{
            let commentById = await commentUserSchema.findById(idComment)
            if(!commentById) return (boom.notFound('Comment not found'))
            if(newComment.email != commentById.email) return (boom.badData('no puedes editar este comentario')) 

            let updateComment = await commentUserSchema.findByIdAndUpdate(idComment,newComment); 
            return updateComment;
        }
        catch(error){
            console.log(error);
            return (boom.badImplementation('Server error updating message'))
           
        }
        
    }

    async deleteComment(idComment,email){
        try{
            let commentById = await commentUserSchema.findById(idComment); 
            if(!commentById) return (boom.notFound('Comment not found'))
            if(email != commentById.email) return (boom.badData("You can't delete the comment"))

            let commentDelete = await commentUserSchema.findByIdAndDelete(idComment)
            return commentDelete;
        }            
        catch(error){
            console.log(error)
            return (boom.badImplementation('Server error deleting comment'))
        }
    }
}

module.exports = commentsService
