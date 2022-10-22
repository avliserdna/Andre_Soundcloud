// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')
const albumsRouter = require('./albums.js')
const commentsRouter = require('./comments.js')
const playlistsRouter = require('./playlists.js')
const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { User, Album } = require('../../db/models');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/comments', commentsRouter);

router.use('/playlists', playlistsRouter);


// router.post('/test', function (req, res) {
//   res.json({ requestBody: req.body });

// });

router.get('/artists/:userId/albums', async (req, res, next) => {
  const { userId } = req.params;
  const artist = await User.findByPk(userId, {
    include: {
      model: Album
    }
  })

  if (!artist) {
    const err = new Error('Not Found');
    err.status = 404;
    err.title = 'Not Found';
    err.errors = ['Artist does not exist!'];
    return next(err);
  }

  return res.json(artist)
})

module.exports = router;
