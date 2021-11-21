const bcrypt = require('bcrypt'); //package de cryptage pour les mdp
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const fs = require('fs');

// Création d'un utilisateur dans la bdd
exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            photoProfil : "../images/default-avatar-user.jpg",
            username : req.body.username,
            email: req.body.email,
            password: hash,
            bio: req.body.bio,
            isAdmin : 0,
        })
        res.status(201).json({ 
            message: 'Utilisateur crée !', 
            userId: newUser.id,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Se connecter à son compte
exports.login = (req, res, next) => { // récupération du login
    User.findOne({ where: { email: req.body.email } }) // verification de l'e-mail entré par l'utilisateur avec un utilisateur existant de la base de données 
        .then(user => { // comparaison avec le MDP envoyé dans la requete avec celui enregistré dans le user (BDD)
            bcrypt.compare(req.body.password, user.password)
            .then(valid => { // si pas bon = erreur
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                } else { // envoi du Token
                    res.status(200).json({ // identifiant valable donc envoi de son user id + token bearer
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign( // identification avec un TOKEN
                            { userId: user.id,
                            isAdmin: user.isAdmin },
                            process.env.TOKEN_SECRET, // utilisation d'une chaîne secrète de développement temporaire pour encoder le token
                            { expiresIn: '24h' } // validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures
                        ) 
                    });
                }
            })
                .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};

//Modifier un user
exports.modifyUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
    .then((user) => {
        const User = req.file ? {
            ...req.body,
            photoProfil: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { 
                username: req.body.username, 
                bio: req.body.bio 
            };
        const filename = user.photoProfil.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            user.update({ ...User, id: req.params.id })
            .then(() => res.status(200).json({ message: "User modifié ! "}))
            .catch((error) => res.status(400).json({ error }));
        })
    })
    .catch((error) => res.status(500).json({ error }));
}

// Modifier un password
exports.modifyPassword = async (req, res) =>{ 
    const password = await bcrypt.hash(req.body.password, 10);
    const value = { password };
    User.findOne({ where : { id: req.params.id }})
      .then(user => {
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé'})
        }
        else {
            user.update({ ...value,  id: req.params.id } )
            .then(res.status(201).json({ message:'Mot de passe modifié !' }))  
            .catch(error=>res.status(400).json({ error:error }) )       
          }     
        })
        .catch(error => res.status(500).json({error})) 
  }

// Supprimer un user
exports.deleteUser = (req, res, next) => {
    User.findOne({where : { id: req.params.id }})
      .then((user) => {
        const filename = user.photoProfil.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            user.destroy()
            .then(() => { res.status(200).json({ message: "Utilisateur supprimé !" }); })
            .catch(error => res.status(400).json(error))
        })
    })
    .catch(error => res.status(500).json({ error }));
};

// Afficher/Récupérer un user 
exports.getOneUser = (req, res, next) => { // Methode pour trouver un user unique
    User.findOne({ where: { id: req.params.id } }) // L'user est retourné dans une promesse envoyée au front
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
};
  
// Afficher/Récupérer tous les users / renvoie un tableau contenant tous les users de la BDD
exports.getAllUsers = (req, res, next) => {
    User.findAll() 
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
};

// se déconnecter 

//exports.logout = (req, res) => {
    //user.update({
        //userId: req.body.userId
   // })
        //.then(() => res.status(200).json({ message: "Utilisateur deconnecté"}))
       // .catch(error => { throw error })
//}