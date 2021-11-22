const { Dislike_comment } = require('../models/index');
const { User } = require('../models/index');
const { Comment } = require('../models/index');

// Création d'un like post :
exports.dislikeComment = async (req, res, next) => {
    try {
      const existDislike = await Dislike_comment.findOne({ where: { UserId: req.user, CommentId: req.params.id } });
      if (existDislike) {
        await Dislike_comment.destroy( { truncate: true } );
        res.status(200).send({ message : "Vous ne dislikez plus ce commentaire !", dislike: false });
      } else {
        const newDislike = await Dislike_comment.create({
          UserId: req.user,
          CommentId: req.params.id
        });
        res.status(201).json({ 
          message: " Je n'aime pas ce commentaire !",
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
exports.getCommentsDislikes = (req, res, next) => {
  Dislike_comment.findAll({ where: { CommentId: req.params.id },
  include: [
    { model: User, attributes: ["username"] },
    { model: Comment, attributes: ["content"] },
  ],
  order: [["createdAt", "ASC"]] })
    .then((dislike) => res.status(200).json(dislike))
    .catch((error) => res.status(404).json({ error }));
};