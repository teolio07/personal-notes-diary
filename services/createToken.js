const jwt = require('jsonwebtoken');
const moment = require('moment');

class createTokens{
    createToken = (nameUser,idUser)=>{ 
        const token = jwt.sign({
            sub: nameUser, idUser,  
            iat: moment().unix() ,
            exp:moment().add(1, 'd').unix(),

                
        }, process.env.TOKEN_SECRET); 
        return token;
    } 

}

module.exports = createTokens;
