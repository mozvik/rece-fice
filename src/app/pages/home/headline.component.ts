import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  // myForm: FormGroup = new FormGroup();
  data?: Array<File>;

  // public fourthFormGroup = new FormGroup({
  //   files: new FormControl('',[Validators.required, Validators.minLength(3)]),
  // })
  minFileCount = 1
  preview = 100
  
  constructor(public dataService: DataService) { }

  aaa(e: any) {
    console.log('e :>> ', e);
  }
  onSubmit() {
    // alert("hurra")
  }

  ngOnInit(): void {
  }

}
