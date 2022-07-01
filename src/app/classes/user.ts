export class User {
  userId: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  active: boolean;
  description: string;
  created: string;
  totalReviews: number;
  totalRecipes: number;
  totalFavorites: number;
  
  constructor(userId: string = '', name: string = '', email: string = '', password: string = '', avatar: string = '', role: string = '', active: boolean = false, description: string = '', created: string = '', totalReviews: number = 0, totalRecipes: number = 0, totalFavorites: number = 0) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
    this.active = active;
    this.description = description;
    this.created = created;
    this.totalReviews = totalReviews;
    this.totalRecipes = totalRecipes;
    this.totalFavorites = totalFavorites;
  }
}
