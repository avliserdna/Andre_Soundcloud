const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User, Song, Album, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { handle } = require('express/lib/router/index.js');
const router = express.Router();

const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Song title is required'),
  check('url')
    .exists({ checkFalsy: true })
    .withMessage('Audio is required'),
  handleValidationErrors
];

const validateComments = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Body is required'),
  handleValidationErrors
];

router.get('/', async (req, res, next) => {
  const songs = await Song.findAll();
  return res.json(songs)
})

router.get('/current', async (req, res, next) => {
  const userSongs = await Song.findAll({
    where: {
      userId: req.user.id
    }
  })
  return res.json(userSongs)
})

router.get('/:songId', async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findOne({
    where: {
      id: songId
    },
    include: [{
      model: User.scope("artist"),
      as: 'Artist'
    }, {
      model: Album.scope("simpleView")
    }]
  })

  if (!song) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Song does not exist!'];
    return next(err);
  }
  return res.json(song)
})

router.post('/', validateSong, async (req, res, next) => {
  const { title, description, url, imageUrl, albumId } = req.body
  const songAlbum = await Album.findByPk(albumId)

  if (req.user.id !== songAlbum.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Forbidden';
    err.errors = ['Not Authorized to add to album!']
    return next(err);
  }

  if (!songAlbum) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ["Album couldn't be found"]
    return next(err);
  }

  const newSong = await Song.create({
    albumId,
    userId: req.user.id,
    title,
    description,
    url,
    previewImage: imageUrl
  })

  return res.json(newSong)
})


router.put('/:songId', validateSong, async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId)
  const { title, description, url, imageUrl, albumId } = req.body
  if (!song) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Song does not exist!'];
    return next(err);
  }

  if (req.user.id !== song.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Forbidden';
    err.errors = ['Not Authorized to add to album!']
    return next(err);
  }

  await song.update({
    albumId,
    userId: req.user.id,
    title,
    description,
    url,
    previewImage: imageUrl
  })

  return res.json(song)
})


router.delete('/:songId', async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId)
  if (!song) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Song does not exist!'];
    return next(err);
  }

  await song.destroy()

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

router.get('/:songId/comments', async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId)
  if (!song) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Song does not exist!'];
    return next(err);
  }


  const comments = await Comment.findAll({
    where: {
      songId: song.id
    },
    include: {
      model: User
    }
  })

  return res.json(comments)
})

router.post('/:songId/comments', validateComments, async (req, res, next) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId)
  if (!song) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Song does not exist!'];
    return next(err);
  }

  const newComment = await song.createComment({
    body: req.body.body,
    userId: req.user.id
  })
  return res.json(newComment)
})
module.exports = router;
