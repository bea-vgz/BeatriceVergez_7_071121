const { Like_post } = require('../models/index');
const { User } = require('../models/index');
const sequelize = require('sequelize');

// Création d'un like post :
exports.likePost = async (req, res, next) => {
    try {
      const existLike = await Like_post.findOne({ 
        where: { UserId: req.user, PostId: req.params.postId } 
      });
      if (existLike) {
        await existLike.destroy();
        res.status(200).json({ like: false });
      } else {
        const newLike = await Like_post.create({
          UserId: req.user,
          PostId: req.params.postId,
        })
        res.status(201).send({ 
          newLike,
          like: true,
        })
      }
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
    const allLikes = Like_post.findAll({ 
      where: { PostId: req.params.postId },
      include: { model: User }
    })
    res.status(200).json({ allLikes })
};

//Récupérer tous les likes d'un post
exports.getAllLikesOnePost = async (req, res, next) => {
  try {
    const allLikes = await Like_post.findAll({ 
      where: { PostId: req.params.postId },
      include: { model: User }
    })
  res.status(200).json({ allLikes })
  } catch (error) {
    res.status(400).json({ error })
  }
};

//Récupérer un like d'un post d'un user
exports.getLikeOnOnePost = async (req, res, next) => {
  try {
    const existLike = await Like_post.findOne(
      { where: { PostId: req.params.postId, UserId: req.user },
      include: { model: User }
    })
    res.status(200).json({ like: existLike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}