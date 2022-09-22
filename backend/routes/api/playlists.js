const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { Album, User, Song, Comment, Playlist, PlaylistSongs } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { handle } = require('express/lib/router/index.js');
const router = express.Router();

const validatePlaylists = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('name is required'),
  handleValidationErrors
];


router.get('/:playlistId', async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId, {
    include: {
      model: Song
    }
  })

  if (!playlist) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Playlist does not exist!'];
    return res.json(err);
  }

  return res.json(playlist)
})

router.get('/current', requireAuth, async (req, res, next) => {
  const userPlaylists = await Playlist.findAll({
    where: {
      userId: req.user.id
    }
  })

  return res.json(userPlaylists)
})

router.post('/', requireAuth, validatePlaylists, async (req, res, next) => {
  const { name, imageUrl } = req.body;
  const newPlaylist = await Playlist.create({
    userId: req.user.id,
    name,
    previewImage: imageUrl
  })

  return res.json(newPlaylist)
})



router.post('/:playlistId/songs', requireAuth, async (req, res, next) => {
  const { playlistId } = req.params;
  const { songId } = req.body;
  const playlist = await Playlist.findByPk(playlistId)
  const song = await Song.findByPk(songId)

  if (!playlist) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Playlist does not exist!'];
    return res.json(err);
  }

  if (!song) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Song does not exist!'];
    return next(err);
  }

  if (req.user.id !== playlist.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Forbidden';
    err.errors = ['Not Authorized to edit to album!']
    return next(err);
  }

  const playlistSong = await playlist.addSong(song)

  return res.json(playlistSong)
})

router.put('/:playlistId', requireAuth, validatePlaylists, async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId)
  const { name, imageUrl } = req.body

  if (!playlist) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Playlist does not exist!'];
    return res.json(err);
  }

  if (req.user.id !== playlist.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Forbidden';
    err.errors = ['Not Authorized to edit to album!']
    return next(err);
  }

  await playlist.update({
    name,
    previewImage: imageUrl
  })
  return res.json(playlist)
})

router.delete('/:playlistId', requireAuth, async (req, res, next) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId)

  if (!playlist) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Playlist does not exist!'];
    return res.json(err);
  }

  if (req.user.id !== playlist.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    err.title = 'Forbidden';
    err.errors = ['Not Authorized to edit to album!']
    return next(err);
  }

  await playlist.destroy()

  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})


module.exports = router;
