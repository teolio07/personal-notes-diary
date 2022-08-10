const jwt = require('jsonwebtoken');


const verifyToken = (req,res,next) =>{ 
    const token = req.header('auth-token');
    if (!token) return ('acceso denegado')
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.json({TokenVencido:error.expiredAt })
    }
}



module.exports = {verifyToken};
