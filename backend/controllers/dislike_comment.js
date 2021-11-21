const { Dislike_comment } = require('../models/index');

// Création d'un like post :
exports.dislikeComment = async (req, res, next) => {
    try {
      const user = await Dislike_comment.findOne({ where: { UserId: req.user, CommentId: req.params.id } });
      if (user) {
        await Dislike_comment.destroy(
          { truncate: true, restartIdentity: true }
        );
        res.status(200).send({ message : "Vous ne dislikez plus ce comme,taire !" });
      } else {
        await Dislike_comment.create({
          UserId: req.user,
          CommentId: req.params.id
        });
        res.status(201).json({ 
          message: " Je n'aime pas !",
          CommentId: req.params.id,
        })
      }
    }
    catch (error) {
          res.status(400).json({ error: error.message });
      }
};

// Afficher/Récupérer tous les commentaires
exports.getAllCommentsDislikes = (req, res, next) => {
  Dislike_comment.findAll( { where: { id: req.params.id } }) 
    .then(dislike => res.status(200).json(dislike))
    .catch(error => res.status(400).json({ error }));
};