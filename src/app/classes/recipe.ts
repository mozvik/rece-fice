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
  labels?: any;

  get id() {
    return this.recipeId 
  } 

  constructor( recipeId: string = '', recipeName: string = '', ingredients: string = '', directions: string = '', created: string = '', updated: string = '', userId: string = '', cookingTime: number = 1, difficulity: string = '', cost: string = '', category: string = '', nationality: string = '', image1: string = '', image2: string = '', image3: string = '', calorie: number = 0, protein: number = 0, carbonhydrate: number = 0, fat: number = 0, sugar: number = 0, servings: number = 1, ratings: number = 0, reviews: string = '', labels: any = {} ) {
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
    this.image = [image1];
    if (image2 != '' && image2 != null) {
      this.image.push(image2)
    }
    if (image3 != '' && image3 != null) {
      this.image.push(image3)
    }
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
    if (this.category) {
      return categoryList.filter(item => item.id == this.category)[0].name
    }
    return ''
  }
  public difficulityName(difficulityList: OptionsData[]): string {
    if (this.difficulity) {
      return difficulityList.filter(item => item.id == this.difficulity)[0].name
    }
    return ''
  }
  public costName(costList: OptionsData[]): string {
    if (this.cost) {
      return costList.filter(item => item.id == this.cost)[0].name
    }
    return ''
  }
  public nationalityName(nationalityList: OptionsData[]): string {
    if (this.nationality) {
      return nationalityList.filter(item => item.id == this.nationality)[0].name
    }
    return ''
  }
  public getLabels(labelList: OptionsData[]): any {
    if (this.labels.length > 0) {
      const arr: any = []
      for (const label of this.labels) {
        arr.push(...labelList.filter(item => item.id == label.labelId))
      }
      return arr;
    }
    return []
  }

}
