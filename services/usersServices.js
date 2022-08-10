const userSchema = require('../models/userSchema');

const createTokens = require('./createToken')
const tokens = new createTokens;

const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')
const uniqid = require('uniqid');
class usersService{

    async usersRegister(avatarUrl,name,email,phone,password){ 
        //validate if the email exists
        let isEmailExist = await userSchema.findOne({ email });
        if (isEmailExist) {
            return (boom.badRequest('User already registered'))
        }
        console.log(avatarUrl)
        if(avatarUrl == "http://localhost:3001/" || avatarUrl == "https://tiendacafe.herokuapp.com/"){
            return (boom.badRequest('You did not select image'))
        }

        //hash password
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);        




        //data for create the user
        try{
            const userRegister = new userSchema() 
            userRegister.avatarUrl = avatarUrl
            userRegister.name = name 
            userRegister.email = email
            userRegister.phone = phone
            userRegister.password = password
            await userRegister.save()
            return userRegister
        }
        catch(error){ 
            return (boom.badImplementation('Server error registering user ')) 
        }
    }


    async usersLogin(email, password,){
   
        
        try{
            //validate if the email exists
            let validateEmail = await userSchema.findOne({email});       
            if(!validateEmail) return (boom.badData('Email and password are not valid '))
            
            //validate if the password belong to the user 
            let validatePassword = await bcrypt.compare(password, validateEmail.password);
            if (!validatePassword) return (boom.badData('Email and password are not valid '))

            //data for login
            let nameUser= validateEmail.name
            let idUser = uniqid()
            let avatarUrl = validateEmail.avatarUrl
            let emailUser = validateEmail.email
            let token = tokens.createToken(nameUser,idUser) 
        
            return ({message: "Session started", 
                    token,
                    name: nameUser,
                    avatarUrl: avatarUrl,
                    email:emailUser

            })
        }
        catch(error){ 
            return (boom.badImplementation('server error logging the user')) 
        }
        
    }


    
}

module.exports = usersService;
