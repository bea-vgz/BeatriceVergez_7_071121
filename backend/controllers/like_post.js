const { Like_post } = require('../models/index');
const { User } = require('../models/index');
const { Post } = require('../models/index');

// Création d'un like post :
exports.likePost = async (req, res, next) => {
    try {
      const existLike = await Like_post.findOne({ 
        where: { UserId: req.user, PostId: req.params.id } 
      });
      if (existLike) {
        await Like_post.destroy({ truncate: true });
        res.status(200).send({ message : "Vous n'aimez plus ce post !", like: false });
      } else {
        const newLike = await Like_post.create({
          UserId: req.user,
          PostId: req.params.id
        });
        res.status(201).json({ 
          message: " J'aime !",
          id : newLike.id,
          like: true
        })
      }
    }
    catch (error) {
          res.status(400).json({ error: error.message });
      }
};

//Recupérer tous les likes d'un post
exports.getPostsLikes = (req, res, next) => {
  Like_post.findAll( { where: { PostId: req.params.id },
    include: [{ model: User, attributes: ["username"] }],
    order: [["createdAt", "ASC"]],
  }) 
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(400).json({ error }));
};
