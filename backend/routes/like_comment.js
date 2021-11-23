const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const likeCtrl = require('../controllers/like_comment');

router.post ('/:commentId/likes', auth, likeCtrl.likeComment);
router.get ('/:commentId/likes', auth, likeCtrl.getCommentsLikes);

module.exports = router;