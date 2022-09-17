const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { Album } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.get('/', async (req, res, next) => {
  console.log(req.user.id)
  const albums = await Album.findAll();
  return res.json(albums)
})

router.post('/', async (req, res, next) => {
  const { title, description, imageUrl } = req.body;
  const newAlbum = await Album.create({
    userId: req.user.id,
    title,
    description,
    previewImage: imageUrl
  })
  return res.json(newAlbum)
})

module.exports = router;
