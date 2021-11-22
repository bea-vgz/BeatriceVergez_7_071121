const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const dislikeCtrl = require('../controllers/dislike_comment');

router.post ('/:id/dislikes', auth, dislikeCtrl.dislikeComment);
router.get ('/:id/dislikes', auth, dislikeCtrl.getCommentsDislikes);

module.exports = router;