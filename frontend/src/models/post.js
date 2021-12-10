// modèle de données
export default class Post {
    constructor(title, content, image, postId, userId) {
      this.title = title;  
      this.content = content;
      this.image = image;
      this.postId = postId;
      this.userId = userId;
    }
  }