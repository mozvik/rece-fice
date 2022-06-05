import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
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
  original: string | undefined;
  preview: any = undefined;
  reader: FileReader;
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
    private messageService: MessageService,
    private router: Router

  ) {
    this.original = this.user.avatar;
    this.reader = new FileReader();
    this.reader.onload = (e: any) => { 
      this.preview = e.target.result;
    }
  }

  ngOnInit(): void {
    
  }

  openInput(){
    this.avatar_file_input!.nativeElement.click()  
  }

  handleFile(files:File[]) {
    this.selected = files[0];
    this.reader.readAsDataURL(files[0])
  }

  upload() {
    this.isLoading = true;
    this.authService.avatarUpload({
      id: this.user.userId,
      avatar: this.selected
    })
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res) => {
        if (res === null) {
          this.dialogRef.close();
          this.messageService.showSnackBar('Nincs hozzáférésed, jelentkezz be úrjra', 'error');
          this.router.navigateByUrl('/login');
        }else if (res === false) {
          this.messageService.showSnackBar('Sikertelen képfeltöltés', 'error');
          this.dialogRef.close(false);
        }
        else {
          this.user.avatar = res;
          this.messageService.showSnackBar('Sikeres profilkép módosítás', 'success');
          this.dialogRef.close(true);
        }

      },
      error: (err) => {
        this.messageService.showSnackBar('Sikertelen képfeltöltés', 'error');
          this.dialogRef.close(false)
      }
    }
      );
  }
  delete() {
    this.isLoading = true;
    this.authService.avatarDelete(this.user.userId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res) => {
        if (res === null) {
          this.dialogRef.close();
          this.messageService.showSnackBar('Nincs hozzáférésed, jelentkezz be úrjra.', 'error');
          this.router.navigateByUrl('/login');
        } else if (res === false) {
          this.messageService.showSnackBar('Sikertelen kép törlés.', 'error');
          this.dialogRef.close(false);
        }
        else {
          this.user.avatar = '';
          this.messageService.showSnackBar('Sikeres profilkép törlés.', 'success');
          this.dialogRef.close(true);
        }

      },
      error: (err) => {
        this.messageService.showSnackBar('Sikertelen képfeltöltés', 'error');
          this.dialogRef.close(false)
      }
    }
      );
  }
}
