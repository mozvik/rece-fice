import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { APIService } from 'src/app/service/api.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  isLoading: boolean = false;

  public contactFormGroup = new FormGroup({
    emailFrom: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.required,
    ]),
    messageFrom: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    gdpr: new FormControl('', [Validators.required]),
  });
  get emailFrom() {
    return this.contactFormGroup.get('emailFrom');
  }
  get messageFrom() {
    return this.contactFormGroup.get('messageFrom');
  }
  get message() {
    return this.contactFormGroup.get('message');
  }
  get gdpr() {
    return this.contactFormGroup.get('gdpr');
  }

  constructor(
    private apiService: APIService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  sendMessage(form: NgForm) {
    if (this.contactFormGroup.invalid) {
      this.messageService.showSnackBar('Kérjük töltse ki a mezőket!', 'error');
      return;
    }

    this.isLoading = true;
    this.apiService
      .postContactData(this.contactFormGroup.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (val) => {
          if (val.ok === true) {
            this.isLoading = false;
            this.messageService.showSnackBar(
              'Üzenet sikeresen elküldve!',
              'success'
            );
            form.reset();
          }
        },
        error: (e) => {
          this.isLoading = false;
          this.messageService.showSnackBar(
            'Hiba történt az üzenet küldése közben!',
            'error'
          );
        },
      });
  }
}
