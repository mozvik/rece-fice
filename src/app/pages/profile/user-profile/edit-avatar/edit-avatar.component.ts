import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { APIService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent implements OnInit {
  @ViewChild('avatar_file_input', { static: true }) avatar_file_input?: ElementRef;
  isLoading: boolean = false;
  selected: File | undefined;
  accept:string = "image/png, image/jpeg, image/jpg";

  public avatarFormGroup = new FormGroup({
    avatar: new FormControl(''),
    
  })
  get avatar() { return this.avatarFormGroup.get('avatar'); }

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<EditAvatarComponent>,
    private authService: AuthService,
    private apiService: APIService,
    private messageService: MessageService,
    private router: Router

  ) {
    // if (user.avatar) {
    //   this.apiService.imageblob(user.avatar).subscribe({
    //     next: (response: any) => {
    //       console.log('response :>> ', new File([response], user.avatar));
    //       //this.uploadedImages.push(new File([response], ele))
    //     }
    //   })
    // }
    
  }

  ngOnInit(): void {
    
  }

  openInput(){
    this.avatar_file_input!.nativeElement.click()  
  }

  handleFile(files:File[]) {
    this.selected = files[0];
  }

  upload() {
    this.isLoading = true;
    this.authService.userUpdate(this.avatarFormGroup.value).subscribe({

      next: (res) => {
        this.isLoading = false;
        if (res === null) {
          this.dialogRef.close();
          this.messageService.showSnackBar('Nincs hozzáférésed, jelentkezz be úrjra', 'error');
          this.router.navigateByUrl('/login');
        }

        if (res.hasOwnProperty('errors')) {
          
          for (const key in res.errors) {
            const err: any = {}
            err[key] = res.errors[key]
            
            this.avatarFormGroup.controls[key].setErrors(err);
            this.avatarFormGroup.controls[key].markAsTouched();
          }
        }
        else {
          this.authService.user!.name = res.name
          this.authService.user!.email = res.email
          this.authService.user!.description = res.description
          this.messageService.showSnackBar('Sikeres profil módosítás', 'success');
          this.dialogRef.close(true);
        }

      },
      error: (err) => {
        this.isLoading = false;
      }
    }
      );
  }
}
