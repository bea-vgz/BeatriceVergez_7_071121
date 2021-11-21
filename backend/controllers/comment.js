const { Comment } = require('../models/index');

// Création d'un commentaire :
exports.createComment = async (req, res, next) => {
    try { 
      const newComment = await Comment.create({
      ...req.body,
      UserId: req.user,
      PostId: req.params.id
    })
      res.status(201).json({ 
        message: "Nouveau commentaire ajouté !",
        content: newComment.content,
        PostId: req.params.id,
      })
    }
    catch (error) {
          res.status(400).json({ error: error.message });
      }
  };

//Modifier un commentaire
exports.modifyComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
        comment.update({ 
            ...req.body 
        })
    .then(() => res.status(200).json({ message: "Commentaire modifié ! "}))
    .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      comment.destroy({ where: { id: req.params.id } })
      .then(() => { res.status(200).json({ message: "Commentaire supprimé !" })})
      .catch((error) => res.status(400).json({ error }));
    })
};

// Afficher/Récupérer un commentaire 
exports.getOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
      .then((comment) => res.status(200).json(comment))
      .catch((error) => res.status(404).json({ error }));
};

// Afficher/Récupérer tous les commentaires
exports.getAllComments = (req, res, next) => {
    Comment.findAll() 
      .then(comment => res.status(200).json(comment))
      .catch(error => res.status(400).json({ error }));
};