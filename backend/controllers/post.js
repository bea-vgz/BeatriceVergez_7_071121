const { Post } = require('../models/index');
const { User } = require('../models/index');
const { Comment } = require('../models/index');
const { Like_post } = require('../models/index');
const { Dislike_post } = require('../models/index');
const fs = require('fs');
require('dotenv').config();

// Création d'un post :
exports.createPost = async (req, res, next) => {
  try { 
    const newPost = await Post.create({
    ...req.body,
    UserId: req.user,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, //On génère l'url de l'image
    likes: 0,
    comments: 0,
  })
    res.status(201).json({ 
      message: "Nouveau post créé !",
      title: newPost.title,
      content: newPost.content,
      image: newPost.image,
      postId: newPost.id
    })
  }
  catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Modifier un post
exports.modifyPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const Post = req.file ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      } : { ...req.body };
      const filename = post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        post.update({ ...Post, id: req.params.id })
        .then(() => res.status(200).json({ message: "Post modifié ! ", post }))
        .catch((error) => res.status(400).json({ error }));
      })
  })
    .catch((error) => res.status(500).json({ error }));
} 

//Supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const filename = post.image.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        post.destroy()
        .then(() => { res.status(200).json({ message: "Post supprimé !" });})
        .catch(error => res.status(400).json(error))
      })
    })
    .catch(error => res.status(500).json({ error }));
};

// Afficher/Récupérer un post 
exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id },
      include: { model: User, attributes: ["username", "photoProfil"]},
    })
      .then((post) => res.status(200).json(post))
      .catch((error) => res.status(404).json({ error }));
};
  
// Afficher/Récupérer tous posts / renvoie un tableau contenant tous les posts de la BDD
exports.getAllPosts = (req, res, next) => {
    Post.findAll() 
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({ error }));
};

// Afficher/Récupérer tous posts / renvoie un tableau contenant tous les posts de la BDD
exports.getAllPostsUser = (req, res, next) => {
  Post.findAll({ where: { UserId: req.params.userId },
    include: { model: User, attributes: ["username"]},
    order: [["createdAt", "ASC"]]
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};