const { Dislike_post } = require('../models/index');
const { User } = require('../models/index');
const { Post } = require('../models/index');

// Création d'un like post :
exports.dislikePost = async (req, res, next) => {
  try {
    const existDislike = await Dislike_post.findOne({ where: { UserId: req.user, PostId: req.params.id } });
      if (existDislike) {
        await Dislike_post.destroy( { truncate: true } );
        res.status(200).send({ message : "Vous ne dislikez plus ce post !", dislike: false });
      } else {
        const newDislike = await Dislike_post.create({
          UserId: req.user,
          PostId: req.params.id
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
exports.getAllPostsDislikes = (req, res, next) => {
  Dislike_post.findAll({ where: { PostId: req.params.id },
  include: [
    { model: User, attributes: ["username"] },
    { model: Post, attributes: ["title"] },
  ],
  order: [["createdAt", "ASC"]] })
    .then((dislike) => res.status(200).json(dislike))
    .catch((error) => res.status(404).json({ error }));
};