const { body, validationResult } = require('express-validator');

const signupRules = () => {
    return [
        body('username')
            .exists() .withMessage("Le prénom est obligatoire")
            .isLength({ min: 4 }) .withMessage("Le prénom doit contenir 4 caractères au minimum"),
        body('email')
            .exists() .withMessage("L'adresse email est obligatoire")
            .isEmail() .withMessage("Mauvais format d'email : l'email doit suivre le schéma xxx@yyy.zzz")
            .contains("groupomania.com") .withMessage("Votre adresse mail est celle de l'entreprise")
            .normalizeEmail(),
        body('password')
            .exists() .withMessage("Le mot de passe est obligatoire")
            .isLength({ min: 8 }) .withMessage('Le mot de passe doit contenir au moins 8 caractères !')
            .matches('[0-9]') .withMessage('Le mot de passe doit contenir au moins un chiffre')
            .matches('[A-Z]') .withMessage('Le mot de passe doit contenir au moins une majuscules'),
    ]
}
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    next();
};

module.exports = {
    signupRules,
    validate
}