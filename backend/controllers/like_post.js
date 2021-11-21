const { Like_post } = require('../models/index');

// Création d'un like post :
exports.likePost = async (req, res, next) => {
    try {
      const user = await Like_post.findOne({ where: { UserId: req.user, PostId: req.params.id } });
      if (user) {
        await Like_post.destroy(
          { truncate: true, restartIdentity: true }
        );
        res.status(200).send({ message : "Vous n'aimez plus ce post !" });
      } else {
        await Like_post.create({
          UserId: req.user,
          PostId: req.params.id
        });
        res.status(201).json({ 
          message: " J'aime !",
          PostId: req.params.id,
        })
      }
    }
    catch (error) {
          res.status(400).json({ error: error.message });
      }
};

// Afficher/Récupérer tous les likes des posts
exports.getAllPostsLikes = (req, res, next) => {
  Like_post.findAll( { where: { PostId: req.params.id } }) 
    .then(like => res.status(200).json(like))
    .catch(error => res.status(400).json({ error }));
};