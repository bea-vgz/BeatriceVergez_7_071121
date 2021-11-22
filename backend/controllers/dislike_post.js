const { Dislike_post } = require('../models/index');
const { User } = require('../models/index');

// Création d'un like post :
exports.dislikePost = async (req, res, next) => {
    try {
      const user = await Dislike_post.findOne({ where: { UserId: req.user, PostId: req.params.id } });
      if (user) {
        await Dislike_post.destroy(
          { truncate: true }
        );
        res.status(200).send({ message : "Vous ne dislikez plus ce post !" });
      } else {
        const newDislike = await Dislike_post.create({
          UserId: req.user,
          PostId: req.params.id
        });
        res.status(201).json({ 
          message: " Je n'aime pas !",
          PostId: req.params.id,
          id: newDislike.id
        })
      }
    }
    catch (error) {
          res.status(400).json({ error: error.message });
      }
};

// Afficher/Récupérer tous les commentaires
exports.getAllPostsDislikes = (req, res, next) => {
  Dislike_post.findAll( { where: { PostId: req.params.id },
    include: [{ model: User, attributes: ["username"] }],
    order: [["createdAt", "ASC"]],
  }) 
    .then(dislike => res.status(200).json(dislike))
    .catch(error => res.status(400).json({ error }));
};