// backend/routes/api/users.js
const express = require('express');
const { Sequelize } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const album = require('../../db/models/album');
const song = require('../../db/models/song');

const router = express.Router();

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });
    await setTokenCookie(res, user);
    return res.json(user);
  }
);

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  // const allSongs = await Song.count({
  //   where: {
  //     userId
  //   }
  // })
  // const user = await User.scope("artist").findByPk(userId, {
  //   attributes: {
  //     include: [
  //       [Sequelize.fn("COUNT", Sequelize.col('Songs.id')),
  //         "totalSongs"],
  //       [Sequelize.fn("COUNT", Sequelize.col('Albums.id')),
  //         "totalAlbums"]
  //     ]
  //   },
  //   include: [{
  //     model: Song,
  //     attributes: ["previewImage"]
  //   },
  //   // Review Sequelize literal syntax
  //   {
  //     model: Album,
  //     attributes: [],
  //   }
  //   ],
  //   group: ["User.id", "Songs.id"]
  // });



  const albumCount = await Album.count({
    where: {
      userId
    }
  })

  const songCount = await Song.count({
    where: {
      userId
    }
  })
  // const countAlbums = await albumData.count()

  const user = await User.scope("artist").findByPk(userId, {
    include: [{
      model: Song,
      attributes: ['previewImage']
    }]
  })

  user.dataValues.totalSongs = songCount
  user.dataValues.totalAlbums = albumCount


  if (!user) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['User does not exist!'];
    return next(err);
  }

  return res.json(user)
})

router.get('/:userId/songs', async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId, {
    include: {
      model: Song
    }
  });

  if (!user) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['User does not exist!'];
    res.status(404)
    return next(err);
  }

  return res.json(user)
})

router.get('/:userId/playlists', async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId, {
    include: {
      model: Playlist
    }
  })

  if (!user) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['User does not exist!'];
    return next(err);
  }

  return res.json(user)
})

module.exports = router;
