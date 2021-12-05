// modèle de données
export default class User {
    constructor( username, email, password, bio, isAdmin, userId) {
      this.username = username; 
      this.bio = bio;
      this.email = email;
      this.password = password;
      this.userId = userId;
      this.isAdmin = isAdmin
    }
  }