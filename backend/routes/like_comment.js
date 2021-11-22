const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const likeCtrl = require('../controllers/like_comment');

router.post ('/:id/likes', auth, likeCtrl.likeComment);
router.get ('/:id/likes', auth, likeCtrl.getCommentsLikes);

module.exports = router;