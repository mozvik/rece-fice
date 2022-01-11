import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  public recipeNameHelp: string = 'Rövid, de lényegretörő nevet válassz.'
  public recipeLabelHelp: string = 'Adj receptedhez címkéket, hogy könnyebben megtalálhatóak legyenek.'
  public recipeTimeHelp: string = 'A recept elkészítési idejét percben add meg.'
  public recipePhotoHelp: string = 'A jól sikerült fotók népszerűbbé tehetik receptjeidet. Maximum 3 képet tölthetsz fel.'

  public recipeFormGroup = this.fb.group({
    name: ['', [Validators.minLength(4), Validators.required]],
    difficulity: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    nationality: ['', Validators.required],
    label: [''],
    directions: this.fb.array(
      [this.createDirectionsFormGroup()]
    ),
    // directions: this.fb.array([
    //   this.fb.control('', Validators.required)
    // ], Validators.required),
    time: ['', Validators.required],
    serving: ['', Validators.required],
    calorie: [''],
    protein: [''],
    carbonh: [''],
    fat: [''],
    sugar: [''],
    photos: ['', Validators.required],
  })
    
  public get directions() {
    return this.recipeFormGroup.get('directions') as FormArray;
  }
    

  constructor(public dataService: DataService, private fb: FormBuilder) {
  }

  

  

  ngOnInit(): void {
    this.recipeFormGroup.controls['nationality'].setValue('11')
    this.recipeFormGroup.controls['serving'].setValue('1')
    this.recipeFormGroup.controls['time'].setValue('30')
    this.recipeFormGroup.controls['difficulity'].setValue('1')
    this.recipeFormGroup.controls['price'].setValue('1')
  }
  private createDirectionsFormGroup(): FormGroup {
    return new FormGroup({
      'dField': new FormControl('', Validators.required)
    })
  }
  
  addDirection() {
    // this.directions.push(this.fb.control('', Validators.required));

    const control = this.recipeFormGroup.get('directions') as FormArray
    control.push(this.createDirectionsFormGroup())
  }
  removeDirection(i: number) {
    // this.directions.removeAt(i);
    console.log('i :>> ', i, this.directions.value[i], this.directions.value.dField?.hasError('required'));
    if (this.directions.length > 1) {
      this.directions.removeAt(i)
    }
  }
  onPhotoSelect(e: any) {
    this.recipeFormGroup.controls['photos'].setValue(e.currentFiles)
    
    // if (this.recipeFormGroup.controls['photos'].value.length) {
      
    // }
    console.log('{{recipeFormGroup.controls :>> ', this.recipeFormGroup.controls['photos'].value);
  }
  onPhotoRemove(e: any) { 
    // this.recipeFormGroup.controls['photos'].setValue(e.currentFiles)
    // console.log('e :>> ', this.recipeFormGroup.controls['photos'].value);
    console.log('e :>> ', e, this.recipeFormGroup.controls['photos'].value);
   
  }
}
