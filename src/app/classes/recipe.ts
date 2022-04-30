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
  difficulty?: any;
  cost?: any;
  category?: any;
  nationality?: any;
  image?: any[];
  calorie?: number;
  protein?: number;
  carbonhydrate?: number;
  fat?: number;
  sugar?: number;
  servings?: number;
  ratings?: number;
  reviews?: any[];
  labels?: any[];

  get id() {
    return this.recipeId 
  } 

  constructor(recipeId: string = '', recipeName: string = '', ingredients: string = '', directions: string = '', created: string = '', updated: string = '', userId: string = '', cookingTime: number = 1, difficulty: any = '', cost: any = '', category: any = '', nationality: any = '', image1: string = '', image2: string = '', image3: string = '', calorie: number = 0, protein: number = 0, carbonhydrate: number = 0, fat: number = 0, sugar: number = 0, servings: number = 1, ratings: number = 0, reviews: any[] = [], labels: any[] = [] ) {
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.ingredients = ingredients.split('||');
    this.directions = directions.split('||');
    this.created = created;
    this.updated = updated;
    this.userId = userId;
    this.cookingTime = cookingTime;
    this.difficulty = difficulty;
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

  // public categoryName(categoryList: OptionsData[]): string {
  //   if (this.category) {
  //     return categoryList.filter(item => item.id == this.category)[0].name
  //   }
  //   return ''
  // }
  // public difficultyName(difficultyList: OptionsData[]): string {
  //   if (this.difficulty) {
  //     return difficultyList.filter(item => item.id == this.difficulty)[0].name
  //   }
  //   return ''
  // }
  // public costName(costList: OptionsData[]): string {
  //   if (this.cost) {
  //     return costList.filter(item => item.id == this.cost)[0].name
  //   }
  //   return ''
  // }
  // public nationalityName(nationalityList: OptionsData[]): string {
  //   if (this.nationality) {
  //     return nationalityList.filter(item => item.id == this.nationality)[0].name
  //   }
  //   return ''
  // }
  // public getLabels(labelList: OptionsData[]): any {
  //   if (this.labels!.length > 0) {
  //     const arr: any = []
  //     for (const label of this.labels!) {
  //       arr.push(...labelList.filter(item => item.id == label.labelId))
  //     }
  //     return arr;
  //   }
  //   return []
  // }

  public getIngredients(): any[] {
    if (this.ingredients && this.ingredients.length > 0) {
      const returnArr: any = []
      for (const row of this.ingredients) {
        const arr = row.split(';') 
        const obj = {
          quantity: arr[0].split(' ')[0],
          unit: arr[0].split(' ')[1],
          name: arr[1]
        }
        returnArr.push(obj)
      }
      return returnArr;
    }
    return []
  }

}
