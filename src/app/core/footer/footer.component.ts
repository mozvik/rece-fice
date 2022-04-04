import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  public newsletterFormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    gdpr: ['', Validators.requiredTrue],
  })
 
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  clo(event: any): void {
    console.log(this.newsletterFormGroup.value)
  }
}
