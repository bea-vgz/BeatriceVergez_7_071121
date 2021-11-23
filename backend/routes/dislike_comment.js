const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const dislikeCtrl = require('../controllers/dislike_comment');

router.post ('/:commentId/dislikes', auth, dislikeCtrl.dislikeComment);
router.get ('/:commentId/dislikes', auth, dislikeCtrl.getCommentsDislikes);

module.exports = router;