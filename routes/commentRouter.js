const express = require('express');
const {createCommnent, getComments, updateComment, deleteComment } = require('../controllers/commentController');
const commentRouter = express.Router();

commentRouter.get('/getNotes/:email', getComments);
commentRouter.post('/createNote',createCommnent)
commentRouter.put('/updateNote',updateComment)
commentRouter.delete('/:dataComment',deleteComment)

module.exports = commentRouter;

