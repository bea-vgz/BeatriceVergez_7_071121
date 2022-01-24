const { Dislike_post } = require('../models/index');
const { User } = require('../models/index');

// Création d'un like post :
exports.dislikePost = async (req, res, next) => {
  try {
    const existDislike = await Dislike_post.findOne({ 
      where: { UserId: req.user, PostId: req.params.postId } 
    });
      if (existDislike) {
        await existDislike.destroy();
        res.status(200).json({ message : "Vous ne dislikez plus ce post !", dislike: false });
      } else {
        const newDislike = await Dislike_post.create({
          UserId: req.user,
          PostId: req.params.postId
        });
        res.status(201).json({ 
          message: " Je n'aime pas !",
          id: newDislike.id,
          dislike: true
        })
      }
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

//Récupérer tous les dislikes d'un post
exports.getAllDislikesOnePost = async (req, res, next) => {
  try {
    const allDislikes = await Dislike_post.findAll({ 
      where: { PostId: req.params.postId },
      include: { model: User }
    })
    res.status(200).json({ allDislikes })
  } catch (error) {
    res.status(400).json({ error })
  }
};

//Récupérer un dislike d'un post d'un user
exports.getDislikeOnOnePost = async (req, res, next) => {
  try {
    const existDislike = await Dislike_post.findOne(
      { where: { PostId: req.params.postId, UserId: req.user },
      include: { model: User }
    })
    res.status(200).json({ dislike: existDislike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}