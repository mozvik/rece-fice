import { OptionsData } from "../interface/options-data";

export class Recipe {
  private recipeId?: string;
  recipeName?: string;
  ingredients?: string[];
  directions?: string[];
  created?: string;
  updated?: string;
  userId?: string;
  cookingTime?: number;
  difficulity?: string;
  cost?: string;
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

  constructor( recipeId: string = '', recipeName: string = '', ingredients: string = '', directions: string = '', created: string = '', updated: string = '', userId: string = '', cookingTime: number = 1, difficulity: string = '', cost: string = '', category: string = '', nationality: string = '', image1: string = '', image2: string = '', image3: string = '', calorie: number = 0, protein: number = 0, carbonhydrate: number = 0, fat: number = 0, sugar: number = 0, servings: number = 1, ratings: number = 0, reviews: string = '', labels: string = '' ) {
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

  public categoryName(categoryList: OptionsData[]): string {
    return categoryList.filter(item => item.id == this.category)[0].name
  }
  public difficulityName(difficulityList: OptionsData[]): string {
    return difficulityList.filter(item => item.id == this.difficulity)[0].name
  }
  public costName(costList: OptionsData[]): string {
    return costList.filter(item => item.id == this.cost)[0].name
  }

}
