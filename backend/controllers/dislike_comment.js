const { Dislike_comment } = require('../models/index');
const { User } = require('../models/index');
const { Comment } = require('../models/index');

// Création d'un like post :
exports.dislikeComment = async (req, res, next) => {
    try {
      const existDislike = await Dislike_comment.findOne({ where: { UserId: req.user, CommentId: req.params.commentId } });
      if (existDislike) {
        await existDislike.destroy();
        res.status(200).json({ message : "Vous ne dislikez plus ce commentaire !", dislike: false });
      } else {
        const newDislike = await Dislike_comment.create({
          UserId: req.user,
          CommentId: req.params.commentId
        });
        res.status(201).json({ 
          message: "Je n'aime pas ce commentaire !",
          id: newDislike.id,
          dislike: true
        })
      }
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

//Récupérer tous les dislikes d'un commentaire
exports.getDislikeOneComment = async (req, res, next) => {
  try {
    const existDislike = await Dislike_comment.findOne(
      { where: { CommentId: req.params.commentId },
      include: { model: User }
    })
    res.status(200).json({ dislike: existDislike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
};