import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';

export interface UserData {
  id: string;
  name: string;
  email: string;
  loginAttempts: string;
  lockoutTime: string;
  active: boolean;
  ban: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements AfterViewInit, OnInit {
  @Input() userList: any[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'loginAttempts',
    'lockoutTime',
    'active',
    'ban',
  ];
  dataSource: MatTableDataSource<UserData> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | null | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    let target: UserData[] = [];
    this.userList.map(
      ({ id, name, email, loginAttempts, lockoutTime, active, ban }) => {
        target.push({
          id: id,
          name: name,
          email: email,
          loginAttempts: loginAttempts,
          lockoutTime: lockoutTime,
          active: active,
          ban: ban,
        });
      }
    );

    this.dataSource = new MatTableDataSource(target);
  }

  ngAfterViewInit(): void {
    // @ts-ignore:
    this.paginator?._intl.itemsPerPageLabel = 'Elemek oldalanként';
    // @ts-ignore:
    this.paginator._intl.nextPageLabel = 'Következő oldal';
    // @ts-ignore:
    this.paginator._intl.previousPageLabel = 'Előző oldal';
    // @ts-ignore:
    this.dataSource?.paginator = this.paginator;
    // @ts-ignore:
    this.dataSource?.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore:
    this.dataSource?.filter = filterValue.trim().toLowerCase();
    // @ts-ignore:
    if (this.dataSource?.paginator) {
      // @ts-ignore:
      this.dataSource.paginator.firstPage();
    }
  }

  setUser(user: UserData) {
    this.isLoading = true;
    if (user.active) {
      this.authService
        .banUser(user.id)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            if (res === null) {
              this.messageService.showSnackBar('Sikertelen módosítás', 'error');
            } else {
              user.active = false;
              this.messageService.showSnackBar(
                'Sikeres felhasználó módosítás',
                'success'
              );
            }
          },
          error: (err) => {
            this.messageService.showSnackBar('Hiba történt: ' + err, 'error');
          },
        });
    } else {
      this.authService
        .activateUser(user.id)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            if (res === null) {
              this.messageService.showSnackBar('Sikertelen módosítás', 'error');
            } else {
              user.active = true;
              user.loginAttempts = '0';
              user.lockoutTime = '0';
              this.messageService.showSnackBar(
                'Sikeres felhasználó módosítás',
                'success'
              );
            }
          },
          error: (err) => {
            this.messageService.showSnackBar('Hiba történt: ' + err, 'error');
          },
        });
    }
  }
}
