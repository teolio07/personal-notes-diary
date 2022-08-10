const express = require('express');
const {createCommnent, getComments, updateComment, deleteComment } = require('../controllers/commentController');
const commentRouter = express.Router();

commentRouter.get('/getComments', getComments);
commentRouter.post('/createComment',createCommnent)
commentRouter.put('/updateComment',updateComment)
commentRouter.delete('/:dataComment',deleteComment)

module.exports = commentRouter;

