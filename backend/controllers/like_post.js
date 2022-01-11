const { Like_post } = require('../models/index');
const { User } = require('../models/index');
const { Post } = require('../models/index');

// Création d'un like post :
exports.likePost = async (req, res, next) => {
    try {
      const existLike = await Like_post.findOne({ where: { UserId: req.user, PostId: req.params.postId } });
      if (existLike) {
        await existLike.destroy();
        res.status(200).json({ message : "Vous n'aimez plus ce post !", like: false });
      } else {
        const newLike = await Like_post.create({
          UserId: req.user,
          PostId: req.params.postId
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

//Récupérer tous les likes d'un post
exports.getPostsLikes = (req, res, next) => {
  Like_post.findAll({ where: { PostId: req.params.postId },
  include: [
    { model: User, attributes: ["username"] },
    { model: Post, attributes: ["title"] },
  ],
  order: [["createdAt", "ASC"]] })
    .then((likes) => res.status(200).json(likes))
    .catch((error) => res.status(404).json({ error }));
};

//Récupérer un like d'un post
exports.getLikeOnOnePost = async (req, res, next) => {
  try {
    const existLike = await Like_post.findOne(
      { where: { PostId: req.params.postId , UserId: req.user }
    })
    res.status(200).json({ like: existLike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}