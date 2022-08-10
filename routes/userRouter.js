const express = require('express');
const {userRegister, userLogin } = require('../controllers/userController') 
const {verifyToken} = require('../middlewares/validateToken')

const userRouter = express.Router();


userRouter.post('/register', userRegister)

userRouter.post('/login', userLogin )

userRouter.get('/admin', verifyToken, (req, res) => {
    usuario = req.user
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})

userRouter.get('/:productId',)

userRouter.put('/:productId', )

userRouter.delete('/:productId', )

module.exports = userRouter;
