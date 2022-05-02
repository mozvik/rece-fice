import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { APIService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';

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
  isLoading: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    public dataService: DataService,
    public apiService: APIService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.isLoading = true;
    this.apiService.subscribeGuest(this.newsletterFormGroup.value.email)
      .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (response: any) => {
        this.newsletterFormGroup.reset();
        this.messageService.showSnackBar(response, 'success')
      },
      error: (error: any) => {
        this.messageService.showSnackBar(error, 'error')
      }
    })
  }
}
