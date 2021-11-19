const { Dislike_post } = require('../models/index');

// Création d'un like post :
exports.dislikePost = async (req, res, next) => {
    try {
      const user = await Dislike_post.findOne({ where: { UserId: req.user, PostId: req.params.id } });
      if (user) {
        await Dislike_post.destroy(
          { truncate: true, restartIdentity: true }
        );
        res.status(200).send({ message : "Vous ne dislikez plus ce post !" });
      } else {
        await Dislike_post.create({
          UserId: req.user,
          PostId: req.params.id
        });
        res.status(201).json({ 
          message: " Je n'aime pas !",
          PostId: req.params.id,
        })
      }
    }
    catch (error) {
          res.status(400).json({ error: error.message });
      }
};

// Afficher/Récupérer tous les commentaires
exports.getAllPostsDislikes = (req, res, next) => {
  Dislike_post.findAll( { where: { postId: req.params.id } }) 
    .then(dislike => res.status(200).json(dislike))
    .catch(error => res.status(400).json({ error }));
};