const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const likeCtrl = require('../controllers/like_post');

router.post ('/:id/likes', auth, likeCtrl.likePost);
router.get ('/:id/likes', auth, likeCtrl.getAllPostsLikes);

module.exports = router;