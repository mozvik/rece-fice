import { Component, ElementRef, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { DataService } from '../../service/data.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { Recipe } from '../../classes/recipe';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { APIService } from '../../service/api.service';
import { filter, find, last, single, take } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class UploadComponent implements OnInit {
  // public teszt: any
  // public tesztData: any[] = []
  @ViewChildren('formRow') rows?: QueryList<ElementRef>;

  public activeIndex: number = 0;
  // public recipeNameHelp: string = 'Rövid, de lényegretörő nevet válassz.'
  // public recipeLabelHelp: string = 'Adj receptedhez címkéket, hogy könnyebben megtalálhatóak legyenek.'

  // public recipePhotoHelp: string = 'A jól sikerült fotók népszerűbbé tehetik receptjeidet. Maximum 3 képet tölthetsz fel.'
  private recipe = new Recipe();
  public filePath: string = ''
  public unitArray: string[] = [
    'darab', 'liter', 'deciliter', 'centiliter', 'milliliter', 'csepp', 'kilogramm', 'dekagramm', 'gramm', 'mokkáskanál', 'kávéskanál', 'teáskanál', 'evőkanál', 'pohár', 'csésze', 'bögre', 'ujjnyi', 'csomag', 'tábla', 'gerezd', 'csokor', 'csipet' 
  ];
  public hungary: any

  public firstFormGroup = this.fb.group({
    name: ['', [Validators.minLength(4), Validators.required]],
    category: ['', Validators.required],
    nationality: ['', Validators.required],
    difficulity: [this.dataService.difficulityList[0], Validators.required],
    cost: ['', Validators.required],
    label: [''],
   
  })
  public secondFormGroup = this.fb.group({
    directions: this.fb.array(
      [this.createDirectionsFormGroup()]
    ),
  })

  public thirdFormGroup = this.fb.group({
    ingredients: this.fb.array(
      [this.createIngredientsFormGroup()]
    ),
  })


  public fourthFormGroup = this.fb.group({
    time: ['', Validators.required],
    serving: ['', Validators.required],
    calorie: [''],
    protein: [''],
    carbonh: [''],
    fat: [''],
    sugar: [''],
  })

  public fifthFormGroup = new FormGroup({
    photos: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(1)]),
  })

      
  public get directions() {
    return this.secondFormGroup.get('directions') as FormArray;
  }
    
  public get ingredients() {
    return this.thirdFormGroup.get('ingredients') as FormArray;
  }

  constructor(public apiService: APIService, public dataService: DataService, private fb: FormBuilder) {
  }

  

  

  ngOnInit(): void {

    this.apiService.nationalities.subscribe({
      next: response => {
        this.hungary = response.items.find((val: any) => val.id == '11')
        this.firstFormGroup.controls['nationality'].setValue(this.hungary)
      }
    })
    

    this.fourthFormGroup.controls['serving'].setValue('1')
    this.fourthFormGroup.controls['time'].setValue('30')
  }
 
  
  private createDirectionsFormGroup(): FormGroup {
    return this.fb.group({
      dField: ['', [Validators.required]],
    })
  }
  private createIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      iName: ['', [Validators.required]],
      iUnit: ['', [Validators.required]],
      iQuantity: [1, [Validators.min(0.1), Validators.required]],
    })
  }
  
  addDirection() {
    const control = this.secondFormGroup.get('directions') as FormArray
    control.push(this.createDirectionsFormGroup())
  }
  removeDirection(i: number) {
    if (this.directions.length > 1) {
      this.directions.removeAt(i)
    }
  }
  addIngredient() {
    const control = this.thirdFormGroup.get('ingredients') as FormArray
    control.push(this.createIngredientsFormGroup())
  }
  removeIngredient(i: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(i)
    }
  }
  
  ngOnChanges(changes: SimpleChanges):void {
    console.log('form changed :>> ', changes);
  }

  submitForm() {
    this.createRecipe()
    console.log('recipeFormGroup :>> ', this.recipe);
    // for (const image of this.recipe.image) {
    //   this.apiService.postRecipeImages(image).subscribe({
    //   next: (response: any) => console.log(response)
    // })
     
    // }
    this.apiService.postRecipe(this.recipe).subscribe({
      next: (response: any) => console.log(response)
    })
  }

  createRecipe() {
    this.recipe.userId = '1' //ideiglenes, amíg nincs auth

    this.recipe.recipeName = this.firstFormGroup.get('name')?.value
    this.recipe.category = this.firstFormGroup.get('category')?.value
    this.recipe.nationality = this.firstFormGroup.get('nationality')?.value
    this.recipe.difficulity = this.firstFormGroup.get('difficulity')?.value
    this.recipe.cost = this.firstFormGroup.get('cost')?.value
    this.recipe.labels = this.firstFormGroup.get('label')?.value

    this.recipe.directions = this.secondFormGroup.get('directions')?.value.map((direction: { dField: any; }) => direction.dField)

    this.recipe.ingredients = this.thirdFormGroup.get('ingredients')?.value.map((ingredient: { iQuantity: string; iUnit: string; iName: string; }) => ingredient.iQuantity + ' ' + ingredient.iUnit + ';' + ingredient.iName)

    this.recipe.cookingTime = this.fourthFormGroup.get('time')?.value
    this.recipe.servings = this.fourthFormGroup.get('serving')?.value
    this.recipe.calorie = this.fourthFormGroup.get('calorie')?.value
    this.recipe.protein = this.fourthFormGroup.get('protein')?.value
    this.recipe.carbonhydrate = this.fourthFormGroup.get('carbonh')?.value
    this.recipe.fat = this.fourthFormGroup.get('fat')?.value
    this.recipe.sugar = this.fourthFormGroup.get('sugar')?.value

    this.recipe.image = this.fifthFormGroup.get('photos')?.value

  }
}

