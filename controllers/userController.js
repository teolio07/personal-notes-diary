const usersService = require('./../services/usersServices')
const service = new usersService
const Joi = require('joi');

//validate data register
const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email() ,
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.string().min(6).max(255).required(),
    avatarUrl: Joi.string().min(6).max(255).required()
   
})


//validate data login
const schemaLogin = Joi.object({ 
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()

})




const userRegister =async (req,res)=>{
    
    //validate data user
    const { error  } = schemaRegister.validate(req.body)
     
    if(error) {
        return res.status(400).json( 
            {error: error.details[0].message}
        )
    }



    try{
        let avatarUrl = req.body.avatarUrl
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        let phone = req.body.phone
        const register = service.usersRegister(avatarUrl,name,email,phone,password)
        register.then((response)=>{ 
            if(response.isBoom == true){
                return res.status(response.output.payload.statusCode).json(response.output.payload);      
            }else{ 
                 
                res.json(response);
            }
        })
        
    }
    catch(error){
        console.log(error)
        return res.send('Server error')
    }
}

const userLogin = async (req,res)=>{
    //validate data login
    const { error  } = schemaLogin.validate(req.body)  
    if(error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
     
    
    try{
        let email = req.body.email
        let password = req.body.password
        const login = service.usersLogin(email,password)
        login.then((resolve)=>{  
                let name = resolve.name
                let token = resolve.token 
                let avatarUrl = resolve.avatarUrl
                let email= resolve.email
                if(token == null){ 
                   return res.status(resolve.output.statusCode).json(resolve.output.payload)
                }
                res.header('auth-token', token).json({
                    information:'Logged in',
                    error: null,
                    token,
                    name,
                    avatarUrl,
                    email
                })

            }
        )
    }
    catch(error){ 
        console.log(error)
        return ('Server error')
    }    

}

module.exports = {userRegister, userLogin }
