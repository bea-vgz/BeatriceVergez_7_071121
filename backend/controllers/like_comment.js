const { Like_comment } = require('../models/index');
const { User } = require('../models/index');
const { Comment } = require('../models/index');

// Création d'un like comment :
exports.likeComment = async (req, res, next) => {
  try {
    const existLike = await Like_comment.findOne({ 
      where: { UserId: req.user, CommentId: req.params.commentId } 
    });
    if (existLike) {
      await existLike.destroy()
      .then( async() => {
        const comment = await Comment.findOne({
          where: { id: req.params.commentId },
          include: [
            {
              model: Like_comment
            },
          ],
        });
      res.status(201).json({ comment, like : false })
      })
    } else {
      Like_comment.create({
        UserId: req.user,
        CommentId: req.params.commentId,
      })
      .then( async() => {
        const comment = await Comment.findOne({
          where: { id: req.params.commentId },
          include: [
            {
              model: Like_comment
            },
          ]
        });
        res.status(201).json({ comment, like: true})
      })
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Récupérer tous les likes d'un comment
exports.getAllLikesOneComment = async (req, res, next) => {
  try {
    const allLikes = await Like_comment.findAll({ 
      where: { CommentId: req.params.commentId },
      include: { model: User }
    })
  res.status(200).json({ allLikes, likes: allLikes.length })
  } catch (error) {
    res.status(400).json({ error })
  }
};

//Récupérer un like d'un comment d'un user
exports.getLikeOnOneComment = async (req, res, next) => {
  try {
    const existLike = await Like_comment.findOne(
      { where: { CommentId: req.params.commentId, UserId: req.user },
      include: { model: User }
    })
    res.status(200).json({ like: existLike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}