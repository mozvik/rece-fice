import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isLoading: boolean = false;

  public contactFormGroup = new FormGroup({
    emailFrom: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
    messageFrom: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  })
  get emailFrom() { return this.contactFormGroup.get('emailFrom'); }
  get messageFrom() { return this.contactFormGroup.get('messageFrom'); }
  get subject() { return this.contactFormGroup.get('subject'); }
  get message() { return this.contactFormGroup.get('message'); }


  constructor() { }

  ngOnInit(): void {
  }

  sendMessage() {
    console.log(this.contactFormGroup.value)
  }
}
