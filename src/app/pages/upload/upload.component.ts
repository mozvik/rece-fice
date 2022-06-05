import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';

import { Recipe } from '../../classes/recipe';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { APIService } from '../../service/api.service';
//import { Measurements } from 'src/app/interface/measurements';
import { MessageService } from 'src/app/service/message.service';
import { OptionsData } from 'src/app/interface/options-data';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { Measurement } from 'src/app/classes/measurement';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class UploadComponent implements OnInit {
 
  categories: OptionsData[] = [];
  nationalities: OptionsData[] = [];
  difficulties: OptionsData[] = [];
  costs: OptionsData[] = [];
  labels: OptionsData[] = [];
  measurements: Measurement[] = []

  isLoading: boolean = false;
  private recipe = new Recipe();

  public currentScreenSize: number | undefined 
  //public unitArray = Measurements
  public hungary: any

  public firstFormGroup = this.fb.group({
    name: ['', [Validators.minLength(4), Validators.required]],
    category: ['', Validators.required],
    nationality: ['', Validators.required],
    difficulty: [this.dataService.difficultyList[0], Validators.required],
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

  constructor(
    private apiService: APIService,
    private dataService: DataService,
    private messageService: MessageService,
    private authService: AuthService,
    private fb: FormBuilder) {
  }
 

  ngOnInit(): void {

    this.dataService.currentScreenSize.subscribe(size => {
      this.currentScreenSize = size;
    })
    this.apiService.categories.subscribe((categories) => this.categories = categories);
    this.apiService.costs.subscribe((costs) => (this.costs = costs));
    this.apiService.difficulties.subscribe(
      (difficulties) => (this.difficulties = difficulties)
    );
    this.apiService.nationalities.subscribe(
      (nationalities) => (this.nationalities = nationalities)
    );
    this.apiService.labels.subscribe((labels) => (this.labels = labels));
    this.apiService.measurements.subscribe((measurements) => this.measurements = measurements)

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
      name: ['', [Validators.required]],
      measurementId: ['', [Validators.required]],
      quantity: [1, [Validators.min(0.1), Validators.required]],
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
  rese(stepper: MatStepper, first: NgForm, second: NgForm, third: NgForm, fourth: NgForm, fifth: NgForm) {
    this.fifthFormGroup.controls['photos'].reset();
    first.reset();
    second.reset();
    third.reset();
    fourth.reset();
    fifth.reset();
    stepper.reset();
  }
  submitForm(stepper: MatStepper, first: NgForm, second: NgForm, third: NgForm, fourth: NgForm, fifth: NgForm) {
    this.isLoading = true;
    this.createRecipe()

    this.apiService.postRecipe(this.recipe)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
      next: (response: any) => {
          if (response != null) {
            
            first.reset();
            second.reset();
            third.reset();
            fourth.reset();
            fifth.reset();
            stepper.reset();
            
            this.messageService.showSnackBar('Sikeres feltöltés!', 'success')
        } else {
            this.messageService.showSnackBar('Sikertelen feltöltés!', 'error')
        }
      },
      error: (error: any) => {
        this.messageService.showSnackBar('Sikertelen feltöltés!', 'error')
       }
    })
  }

  createRecipe() {
    this.recipe.userId = this.authService.user?.userId

    this.recipe.recipeName = this.firstFormGroup.get('name')?.value
    this.recipe.category = this.firstFormGroup.get('category')?.value
    this.recipe.nationality = this.firstFormGroup.get('nationality')?.value
    this.recipe.difficulty = this.firstFormGroup.get('difficulty')?.value
    this.recipe.cost = this.firstFormGroup.get('cost')?.value
    this.recipe.labels = this.firstFormGroup.get('label')?.value

    this.recipe.directions = this.secondFormGroup.get('directions')?.value.map((direction: { dField: any; }) => direction.dField)

    this.recipe.ingredients = this.thirdFormGroup.get('ingredients')?.value

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

