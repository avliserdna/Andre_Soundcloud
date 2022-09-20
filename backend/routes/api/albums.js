const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { Album, User, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { handle } = require('express/lib/router/index.js');
const router = express.Router();

const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Album title is required'),
  handleValidationErrors
];

router.get('/', async (req, res, next) => {
  const albums = await Album.findAll();
  return res.json(albums)
})

router.post('/', validateAlbum, async (req, res, next) => {
  const { title, description, url, imageUrl } = req.body;
  const newAlbum = await Album.create({
    userId: req.user.id,
    title,
    description,
    url,
    previewImage: imageUrl
  })
  return res.json(newAlbum)
})

router.get('/:albumId', async (req, res, next) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId, {
    // where: {
    //   id: albumId
    // },
    // Include needs to be looked at with Zaviar and Anthony,.
    include: [{
      model: User.scope("artist")
    }, {
      model: Song
    }]
  });

  if (!album) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Album does not exist!'];
    return next(err);
  }
  return res.json(album)
})

router.put('/:albumId', validateAlbum, async (req, res, next) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId)
  const { title, description, imageUrl } = req.body;

  if (!album) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Album does not exist!'];
    return next(err);
  }


  if (req.user.id !== album.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Forbidden';
    err.errors = ['Not Authorized to edit to album!']
    return next(err);
  }

  await album.update({
    title,
    description,
    previewImage: imageUrl
  })

  return res.json(album)
})

router.delete('/:albumId', async (req, res, next) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId)

  if (!album) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Album does not exist!'];
    return next(err);
  }

  await album.destroy()

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})
module.exports = router;
