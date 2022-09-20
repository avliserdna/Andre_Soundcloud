const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { Album, User, Song, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { handle } = require('express/lib/router/index.js');
const router = express.Router();

const validateComments = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Body is required'),
  handleValidationErrors
];

router.put('/:commentId', validateComments, async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findByPk(commentId)
  if (!comment) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Comment does not exist!'];
    return next(err);
  }
  await comment.update({
    body: req.body.body
  })

  return res.json(comment)
})

router.delete('/:commentId', async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findByPk(commentId)
  if (!comment) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Comment does not exist!'];
    return next(err);
  }

  if (req.user.id !== comment.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Forbidden';
    err.errors = ['Not Authorized to edit comment!']
    return next(err);
  }

  await comment.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})
module.exports = router;
