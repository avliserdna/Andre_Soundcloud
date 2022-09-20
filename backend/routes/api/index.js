// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')
const albumsRouter = require('./albums.js')
const commentsRouter = require('./comments.js')
const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/comments', commentsRouter)

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });

});

module.exports = router;
