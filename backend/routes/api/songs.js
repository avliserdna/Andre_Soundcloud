const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User, Song, Album, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { handle } = require('express/lib/router/index.js');
const { singlePublicFileUpload, multiplePublicFileUpload, multipleFileKeysUpload, multipleMulterUpload } = require('../../awsS3.js');
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

  let { page, size, title, createdAt } = req.query;

  if (page) {
    if (JSON.parse(page) === 0) {
      const err = new Error('Bad Request');
      err.status = 400;
      err.title = 'Bad request';
      err.errors = ["Page must be greater than 0"]
      return next(err);
    }
  }

  if (size) {
    if (JSON.parse(size) === 0) {
      const err = new Error('Bad Request');
      err.status = 400;
      err.title = 'Bad request';
      err.errors = ["Size must be greater than 0"]
      return next(err);
    }
  }


  if (!page) {
    page = 1
  }

  if (typeof JSON.parse(page) !== "number") {
    const err = new Error('Bad Request');
    err.status = 400;
    err.title = 'Bad request';
    err.errors = ["Page must be a number"]
    return next(err);
  }
  else if (JSON.parse(page) < 0) {
    const err = new Error('Bad Request');
    err.status = 400;
    err.title = 'Bad request';
    err.errors = ["Page must be greater than 0"]
    return next(err);
  }

  if (!size) {
    size = 5
  }

  if (typeof JSON.parse(size) !== "number") {
    const err = new Error('Bad Request');
    err.status = 400;
    err.title = 'Bad request';
    err.errors = ["Size must be a number"]
    return next(err);
  }
  else if (JSON.parse(size) < 0) {
    const err = new Error('Bad Request');
    err.status = 400;
    err.title = 'Bad request';
    err.errors = ["Size must be greater than 0"]
    return next(err);
  }
  if (title) {
    if (typeof JSON.parse(title) !== "string") {
      const err = new Error('Bad Request');
      err.status = 400;
      err.title = 'Bad request';
      err.errors = ["Title must be characters!"]
      return next(err);
    }
    const titleSong = await Song.findAll({
      where: {
        title
      },
      limit: size,
      offset: (page - 1) * size
    });

    if (!titleSong) {
      return res.json({
        status: "404",
        message: "No song found with the title!"
      })
    }

    return res.json(titleSong)
  }
  if (createdAt) {
    if (typeof JSON.parse(title) !== "date") {
      const err = new Error('Bad Request');
      err.status = 400;
      err.title = 'Bad request';
      err.errors = ["Proper date format must be provided!"]
      return next(err);
    }
    const createdAtSong = await Song.findAll({
      where: {
        createdAt
      },
      limit: size,
      offset: (page - 1) * size
    })

    if (!createdAtSong) {
      return res.json({
        status: "404",
        message: "No song found with the date!"
      })
    }
    return res.json(createdAtSong)
  }

  const songs = await Song.findAll({
    limit: size,
    offset: (page - 1) * size
  });
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
      model: User.scope("artist")
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

router.post('/', multipleMulterUpload([{ name: 'url', maxCount: 1 }, { name: 'previewImage', maxCount: 1 }]), validateSong,
  async (req, res, next) => {
    const { userId, title, description, url, imageUrl, albumId } = req.body

    // console.log(req.body, "<=== REQUEST BODY")
    // console.log(req.user, "<== REQUEST USER")
    // let songAlbum = albumId ? await Album.findByPk(albumId) : null
    let songAlbum;
    // console.log(songAlbum, "<== album")


    // if (!songAlbum) {
    //   const err = new Error('Not Found');
    //   err.status = 404;
    //   err.title = 'Not Found';
    //   err.errors = ["Album couldn't be found"]
    //   return next(err);
    // }
    const previewImage = await singlePublicFileUpload(req.files.previewImage[0])

    const imgurl = await singlePublicFileUpload(req.files.url[0])
    if (songAlbum && Number(userId) !== songAlbum.userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ['Not Authorized to add to album!']
      return next(err);
    }
    console.log(previewImage)
    console.log(req.files)
    console.log(songurl)
    const newSong = await Song.create({
      albumId: null,
      userId: Number(userId),
      title,
      description,
      url,
      previewImage: imgurl
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
