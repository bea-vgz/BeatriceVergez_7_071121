const { Like_comment } = require('../models/index');
const { User } = require('../models/index');
const { Comment } = require('../models/index');

// Création d'un like post :
exports.likeComment = async (req, res, next) => {
    try {
      const existLike = await Like_comment.findOne({ where: { UserId: req.user, CommentId: req.params.id } });
      if (existLike) {
        await Like_comment.destroy( { truncate: true } );
        res.status(200).send({ message : "Vous n'aimez plus ce commentaire !", like: false });
      } else {
        const newLike = await Like_comment.create({
          UserId: req.user,
          CommentId: req.params.id
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

// Afficher/Récupérer tous les commentaires
exports.getCommentsLikes = (req, res, next) => {
  Like_comment.findAll( { where: { CommentId: req.params.id },
    include: [
      { model: User, attributes: ["username"] },
      { model: Comment, attributes: ["content"] },
    ],
    order: [["createdAt", "ASC"]] })
    .then(dislike => res.status(200).json(dislike))
    .catch(error => res.status(400).json({ error }));
};