const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment');
const adminComment = require('../middleware/adminComment')

router.post ('/:id/comments', auth, commentCtrl.createComment);
router.put ('/comments/:id', auth, adminComment, commentCtrl.modifyComment);
router.delete ('/comments/:id', auth, adminComment, commentCtrl.deleteComment);
router.get ('/comments/:id', auth, commentCtrl.getOneComment);
router.get ('/:id/comments', auth, commentCtrl.getPostsComments);

module.exports = router;