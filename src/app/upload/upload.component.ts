import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { Recipe } from '../classes/recipe';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { APIService } from '../service/api.service';

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
  public teszt: any
  public tesztData: any[] = []
  public activeIndex: number = 0;
  // public recipeNameHelp: string = 'Rövid, de lényegretörő nevet válassz.'
  public recipeLabelHelp: string = 'Adj receptedhez címkéket, hogy könnyebben megtalálhatóak legyenek.'
  public recipeTimeHelp: string = 'A recept elkészítési idejét percben add meg.'
  public recipePhotoHelp: string = 'A jól sikerült fotók népszerűbbé tehetik receptjeidet. Maximum 3 képet tölthetsz fel.'
  private recipe = new Recipe();
  public filePath: string = ''

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
    time: ['', Validators.required],
    serving: ['', Validators.required],
    calorie: [''],
    protein: [''],
    carbonh: [''],
    fat: [''],
    sugar: [''],
  })

  public fourthFormGroup = new FormGroup({
    photos: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(3)]),
    photos2: new FormControl('', Validators.required),
  })

  // public recipeFormGroup = this.fb.group({
  //   name: ['', [Validators.minLength(4), Validators.required]],
  //   difficulity: ['', Validators.required],
  //   price: ['', Validators.required],
  //   category: ['', Validators.required],
  //   nationality: ['', Validators.required],
  //   label: [''],
  //   directions: this.fb.array(
  //     [this.createDirectionsFormGroup()]
  //   ),
  
  //   time: ['', Validators.required],
  //   serving: ['', Validators.required],
  //   calorie: [''],
  //   protein: [''],
  //   carbonh: [''],
  //   fat: [''],
  //   sugar: [''],
  //   photos: ['', Validators.required],
  // })
    
  public get directions() {
    return this.secondFormGroup.get('directions') as FormArray;
  }
    

  constructor(public apiService: APIService, public dataService: DataService, private fb: FormBuilder) {
  }

  

  

  ngOnInit(): void {
    this.firstFormGroup.controls['nationality'].setValue('11')
    this.thirdFormGroup.controls['serving'].setValue('1')
    this.thirdFormGroup.controls['time'].setValue('30')
    // this.apiService.difficulities.subscribe(response => {
    //   this.dataService.difficulityList = response.items
    //   const def = this.dataService.difficulityList.find(val => val.id=='1')
    //   this.firstFormGroup.controls['difficulity'].setValue(def)
    // })
    console.log('fourthFormGroup.get(photos :>> ', this.fourthFormGroup);
    
    this.firstFormGroup.controls['cost'].setValue('1')

  }

  
  handleFileInputChange(fl: FileList | null) {
    // this.file_store = l;

    console.log('fl :>> ', fl);
    if (fl) {
      for (let index = 0; index < fl.length; index++) {
        this.fourthFormGroup.controls['photos'].patchValue(fl[index])
      
      }
      const reader = new FileReader();
      
      reader.onload = () => {
        this.filePath = reader.result as string;
      }
      reader.readAsDataURL(fl[0])
    }
    // this.fourthFormGroup.controls['photos'].patchValue(`${fl?}`)
    // this.fourthFormGroup.controls.get('photos').patchValue(`${fl.name}`)

    // if (l.length) {
    //   const f = l[0];
    //   const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
    //   this.display.patchValue(`${f.name}${count}`);
    // } else {
    //   this.display.patchValue("");
    // }
  }

  aaa(e: any) {
    console.log('e :>> ', e);
  }

  

  bbb(e: any) {
    console.log('e :>> ', this.fourthFormGroup.controls['photos'].value, this.fourthFormGroup.controls['photos'].hasError('required'), this.fourthFormGroup.controls['photos'].status);
  }
  // private createDirectionsFormGroup(): FormGroup {
  //   return new FormGroup({
  //     'dField': new FormControl('', Validators.required)
  //   })
  // }
  private createDirectionsFormGroup(): FormGroup {
    return this.fb.group({
      dField: ""
    })
  }
  
  addDirection() {
    // this.directions.push(this.fb.control('', Validators.required));

    const control = this.secondFormGroup.get('directions') as FormArray
    control.push(this.createDirectionsFormGroup())
  }
  removeDirection(i: number) {
    // this.directions.removeAt(i);
    console.log('i :>> ', i, this.directions.value[i], this.directions.value.dField?.hasError('required'));
    if (this.directions.length > 1) {
      this.directions.removeAt(i)
    }
  }
  // onPhotoSelect(e: any) {
    // this.recipeFormGroup.controls['photos'].setValue(e.currentFiles)
    
    
    // console.log('{{recipeFormGroup.controls :>> ', this.recipeFormGroup.controls['photos'].value);
  // }
  // onPhotoRemove(e: any) { 
  
  //   console.log('e :>> ', e, this.recipeFormGroup.controls['photos'].value);
   
  // }

  submitForm() {
    console.log('recipeFormGroup :>> ', this.fourthFormGroup.value, this.recipe);
  }

}
