const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment');
const adminComment = require('../middleware/adminComment')

router.post ('/:id/comments', auth, commentCtrl.createComment);
router.put ('/:id/comments/:id', auth, adminComment, commentCtrl.modifyComment);
router.delete ('/:id/comments/:id', auth, adminComment, commentCtrl.deleteComment);
router.get ('/:id/comments/:id', auth, commentCtrl.getOneComment);
router.get ('/:id/comments', auth, commentCtrl.getAllComments);

module.exports = router;