import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/classes/recipe';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
//import { Measurements } from 'src/app/interface/measurements';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/service/message.service';
import { OptionsData } from 'src/app/interface/options-data';
import { AuthService } from 'src/app/service/auth.service';
import { finalize, forkJoin, of } from 'rxjs';
import { Measurement } from 'src/app/classes/measurement';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class EditComponent implements OnInit {
  categories: OptionsData[] = [];
  nationalities: OptionsData[] = [];
  difficulties: OptionsData[] = [];
  costs: OptionsData[] = [];
  labels: OptionsData[] = [];
  measurements: Measurement[] = [];

  found: boolean = true;
  currentScreenSize: number | undefined;
  selectedId: any;
  isLoading: boolean = false;
  recipe: Recipe = new Recipe();
  uploadedImages: File[] = [];
  dialogDeleteRef: any;
  isImageRequired: boolean = false;
  maxLength: number | undefined = 3;
  minLength: number | undefined = 1;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public firstFormGroup = this.fb.group({
    name: [
      { value: '', disabled: true },
      [Validators.minLength(4), Validators.required],
    ],
    category: ['', Validators.required],
    nationality: ['', Validators.required],
    difficulty: ['', Validators.required],
    cost: ['', Validators.required],
    label: [''],
  });
  public secondFormGroup = this.fb.group({
    directions: this.fb.array([this.createDirectionsFormGroup()]),
  });

  public thirdFormGroup = this.fb.group({
    ingredients: this.fb.array([this.createIngredientsFormGroup()]),
  });

  public fourthFormGroup = this.fb.group({
    time: ['', Validators.required],
    serving: ['', Validators.required],
    calorie: [''],
    protein: [''],
    carbonh: [''],
    fat: [''],
    sugar: [''],
  });

  public fifthFormGroup = new FormGroup({
    photos: new FormControl('', [
      Validators.maxLength(3),
      Validators.minLength(1),
    ]),
  });
  //public unitArray = Measurements

  public get directions() {
    return this.secondFormGroup.get('directions') as FormArray;
  }

  public get ingredients() {
    return this.thirdFormGroup.get('ingredients') as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private apiService: APIService,
    private authService: AuthService,
    private msgService: MessageService,
    private fb: FormBuilder,
    public dialogDelete: MatDialog,
    private router: Router
  ) {
    const stream = forkJoin([
      of(
        this.apiService.categories.subscribe(
          (categories) => (this.categories = categories)
        )
      ),
      of(this.apiService.costs.subscribe((costs) => (this.costs = costs))),
      of(
        this.apiService.difficulties.subscribe(
          (difficulties) => (this.difficulties = difficulties)
        )
      ),
      of(
        this.apiService.nationalities.subscribe(
          (nationalities) => (this.nationalities = nationalities)
        )
      ),
      of(this.apiService.labels.subscribe((labels) => (this.labels = labels))),
      of(
        this.apiService.measurements.subscribe(
          (measurements) => (this.measurements = measurements)
        )
      ),
      of(
        this.activatedRoute.data.subscribe((data) => {
          if (data['recipe'].length === 0) {
            this.found = false;
          } else {
            this.recipe = this.dataService.createRecipes(data['recipe'])[0];

            this.maxLength = 3 - this.recipe.image!.length;
            this.fillUpFirstForm();
            this.fillUpSecondForm();
            this.fillUpThirdForm();
            this.fillUpFourthForm();
            this.fillUpFifthForm();
          }
        })
      ),
    ]);

    stream.subscribe();

    this.dataService.currentScreenSize.subscribe((size) => {
      this.currentScreenSize = size;
    });
  }

  ngOnInit(): void {}

  private createDirectionsFormGroup(): FormGroup {
    return this.fb.group({
      dField: ['', [Validators.required]],
    });
  }
  private createIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      measurementId: ['', [Validators.required]],
      quantity: [1, [Validators.min(0.1), Validators.required]],
    });
  }
  addDirection() {
    const control = this.secondFormGroup.get('directions') as FormArray;
    control.push(this.createDirectionsFormGroup());
  }
  removeDirection(i: number) {
    if (this.directions.length > 1) {
      this.directions.removeAt(i);
    }
  }
  addIngredient() {
    const control = this.thirdFormGroup.get('ingredients') as FormArray;
    control.push(this.createIngredientsFormGroup());
  }
  removeIngredient(i: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(i);
    }
  }

  private fillUpFirstForm() {
    const labels: any[] = [];
    this.firstFormGroup.controls['name'].setValue(this.recipe.recipeName);
    this.firstFormGroup.controls['category'].setValue(
      this.categories.find((item) => item.id == this.recipe.category.id)
    );
    this.firstFormGroup.controls['nationality'].setValue(
      this.nationalities.find((item) => item.id == this.recipe.nationality.id)
    );
    this.firstFormGroup.controls['difficulty'].setValue(
      this.difficulties.find((item) => item.id == this.recipe.difficulty.id)
    );
    this.firstFormGroup.controls['cost'].setValue(
      this.costs.find((item) => item.id == this.recipe.cost.id)
    );

    for (const item of this.recipe.labels!.map((m: { id: any }) => m.id)) {
      labels.push(this.labels.filter((i) => i.id == item)[0]);
    }
    this.firstFormGroup.controls['label'].setValue(labels);
  }
  private fillUpSecondForm() {
    const fArray = this.secondFormGroup.controls['directions'];

    for (let i = 0; i < this.recipe.directions!.length - 1; i++) {
      this.addDirection();
    }
    for (let i = 0; i < this.recipe.directions!.length; i++) {
      fArray.value[i].dField = this.recipe.directions![i];
    }
    this.secondFormGroup.controls['directions'].setValue(fArray.value);
  }
  private fillUpThirdForm() {
    const fArray = this.thirdFormGroup.controls['ingredients'];

    for (let i = 0; i < this.recipe.ingredients!.length - 1; i++) {
      this.addIngredient();
    }

    for (let i = 0; i < this.recipe.ingredients!.length; i++) {
      const ele = this.recipe.ingredients![i];
      //const splitArray = ele.split(';')
      //const splitUnit = splitArray[0].split(' ')
      // fArray.value[i].iName = splitArray[1]
      // fArray.value[i].iUnit = splitUnit[1]
      // fArray.value[i].iQuantity = Number(splitUnit[0])
      fArray.value[i].name = ele.name;
      fArray.value[i].measurementId = ele.measurementId;
      fArray.value[i].quantity = Number(ele.quantity);
    }

    this.thirdFormGroup.controls['ingredients'].setValue(fArray.value);
  }

  private fillUpFourthForm() {
    this.fourthFormGroup.controls['time'].setValue(this.recipe.cookingTime);
    this.fourthFormGroup.controls['serving'].setValue(this.recipe.servings);
    this.fourthFormGroup.controls['calorie'].setValue(this.recipe.calorie);
    this.fourthFormGroup.controls['carbonh'].setValue(
      this.recipe.carbonhydrate
    );
    this.fourthFormGroup.controls['protein'].setValue(this.recipe.protein);
    this.fourthFormGroup.controls['fat'].setValue(this.recipe.fat);
    this.fourthFormGroup.controls['sugar'].setValue(this.recipe.sugar);
  }
  private fillUpFifthForm() {
    for (let i = 0; i < this.recipe.image!.length; i++) {
      const ele = this.recipe.image![i];
      if (ele && ele !== '' && ele !== null) {
        this.apiService.imageblob(ele).subscribe({
          next: (response: any) => {
            this.uploadedImages.push(new File([response], ele));
          },
        });
      }
    }
  }

  openDeleteDialog(item: File): void {
    this.dialogDeleteRef = this.dialogDelete.open(DialogDeleteImage, {
      data: item,
    });

    this.dialogDeleteRef.afterClosed().subscribe((result: File) => {
      if (result) {
        if (
          this.uploadedImages.splice(
            this.uploadedImages.findIndex((f) => f === item),
            1
          ) !== []
        ) {
          this.maxLength = 3 - this.uploadedImages.length;
          if (this.uploadedImages.length === 0) {
            this.isImageRequired = true;
          }
        }
      }
    });
  }
  submitForm() {
    this.isLoading = true;
    this.createRecipe();
    this.apiService
      .putRecipe(this.recipe)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: any) => {
          this.msgService.showSnackBar(
            `${this.recipe.recipeName} recept sikeresen módosítva.`,
            'success'
          );
          if (this.dataService.userRecipeList.length > 0) {
            const idx = this.dataService.userRecipeList.findIndex(
              (f) => f.id == response.recipeId
            );
            const updatedRecipe = this.dataService.createRecipes([response]);
            this.dataService.userRecipeList[idx] = updatedRecipe[0];
          }
          this.router.navigateByUrl('/profile');
        },
        error: (error: any) => this.msgService.showSnackBar(error, 'error'),
      });
  }

  createRecipe() {
    this.recipe.userId = this.authService.user?.userId;

    this.recipe.recipeName = this.firstFormGroup.get('name')?.value;
    this.recipe.category = this.firstFormGroup.get('category')?.value;
    this.recipe.nationality = this.firstFormGroup.get('nationality')?.value;
    this.recipe.difficulty = this.firstFormGroup.get('difficulty')?.value;
    this.recipe.cost = this.firstFormGroup.get('cost')?.value;
    this.recipe.labels = this.firstFormGroup.get('label')?.value;

    this.recipe.directions = this.secondFormGroup
      .get('directions')
      ?.value.map((direction: { dField: any }) => direction.dField);

    this.recipe.ingredients = this.thirdFormGroup.get('ingredients')?.value;

    this.recipe.cookingTime = this.fourthFormGroup.get('time')?.value;
    this.recipe.servings = this.fourthFormGroup.get('serving')?.value;
    this.recipe.calorie = this.fourthFormGroup.get('calorie')?.value;
    this.recipe.protein = this.fourthFormGroup.get('protein')?.value;
    this.recipe.carbonhydrate = this.fourthFormGroup.get('carbonh')?.value;
    this.recipe.fat = this.fourthFormGroup.get('fat')?.value;
    this.recipe.sugar = this.fourthFormGroup.get('sugar')?.value;

    let fArray: File[] = [];
    fArray = [...this.uploadedImages];
    this.fifthFormGroup.get('photos')?.value != ''
      ? fArray.push(...this.fifthFormGroup.get('photos')?.value)
      : '';
    this.recipe.image = fArray;
  }
}

@Component({
  selector: 'dialog-delete-image',
  templateUrl: 'dialog-delete-image.html',
})
export class DialogDeleteImage {
  constructor(@Inject(MAT_DIALOG_DATA) public data: File) {}
}
