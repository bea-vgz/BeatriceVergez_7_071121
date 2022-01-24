const { Like_comment } = require('../models/index');
const { User } = require('../models/index');
const { Comment } = require('../models/index');

// Création d'un like post :
exports.likeComment = async (req, res, next) => {
    try {
      const existLike = await Like_comment.findOne({ 
        where: { UserId: req.user, CommentId: req.params.commentId } 
      });
      if (existLike) {
        await existLike.destroy();
        res.status(200).json({ message : "Vous n'aimez plus ce commentaire !", like: false });
      } else {
        const newLike = await Like_comment.create({
          UserId: req.user,
          CommentId: req.params.commentId
        });
        res.status(201).json({ 
          message: " J'aime ce commentaire !",
          id: newLike.id,
          like: true
        })
      }
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

//Récupérer tous les likes d'un comment
exports.getCommentsLikes = async (req, res, next) => {
  try {
    const allLikes = await Like_comment.findAll({ 
      where: { CommentId: req.params.commentId },
      include: { model: User }
    })
  res.status(200).json({ allLikes })
  } catch (error) {
    res.status(400).json({ error })
  }
};

//Récupérer un like d'un comment d'un user
exports.getLikeOneComment = async (req, res, next) => {
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