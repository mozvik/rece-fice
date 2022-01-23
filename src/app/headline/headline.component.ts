import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  public fourthFormGroup = new FormGroup({
    photos: new FormControl('', Validators.required),
  })
  
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
