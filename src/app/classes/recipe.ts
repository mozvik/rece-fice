export class Recipe {
  private recipeId?: string;
  recipeName?: string;
  ingredients?: string[];
  directions?: string[];
  created?: string;
  updated?: string;
  userId?: string;
  cookingTime?: number;
  difficulity?: number;
  cost?: number;
  category?: string;
  nationality?: string;
  image?: any[];
  calorie?: number;
  protein?: number;
  carbonhydrate?: number;
  fat?: number;
  sugar?: number;
  servings?: number;
  ratings?: number;
  reviews?: string;
  labels?: string;

  get id() {
    return this.recipeId 
  } 

  constructor( recipeId: string = '', recipeName: string = '', ingredients: string = '', directions: string = '', created: string = '', updated: string = '', userId: string = '', cookingTime: number = 1, difficulity: number = 1, cost: number = 1, category: string = '', nationality: string = '', image1: string = '', image2: string = '', image3: string = '', calorie: number = 0, protein: number = 0, carbonhydrate: number = 0, fat: number = 0, sugar: number = 0, servings: number = 1, ratings: number = 0, reviews: string = '', labels: string = '' ) {
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.ingredients = ingredients.split('||');
    this.directions = directions.split('||');
    this.created = created;
    this.updated = updated;
    this.userId = userId;
    this.cookingTime = cookingTime;
    this.difficulity =  difficulity;
    this.cost = cost;
    this.category = category;
    this.nationality = nationality;
    this.image = [image1,image2,image3];
    this.calorie = calorie;
    this.protein = protein;
    this.carbonhydrate = carbonhydrate;
    this.fat = fat;
    this.sugar = sugar;
    this.servings = servings;
    this.ratings = ratings;
    this.reviews = reviews;
    this.labels = labels;
  }

  

}
