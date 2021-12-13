// modèle de données
export default class Post {
    constructor(title, content, image, postId) {
      this.title = title;  
      this.content = content;
      this.image = image;
      this.postId = postId;
    }
  }