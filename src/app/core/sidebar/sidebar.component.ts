import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/auth.service';
import { chevronRotate, collapseSubMenu } from '../../animations';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [chevronRotate, collapseSubMenu],
})
export class SidebarComponent implements OnInit {
  events: string[] = [];

  currentScreenSize: number | undefined;
  submenuCollapsed: boolean = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isSidebarOpened() {
    return this.dataService.sidenavOpened && this.currentScreenSize! < 2;
  }
  set isSidebarOpened(value: boolean) {
    this.dataService.sidenavOpened = value;
  }

  get user(): User | undefined {
    return this.authService.user;
  }

  constructor(
    public dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {
    this.dataService.currentScreenSize.subscribe((size) => {
      this.currentScreenSize = size;
    });
  }

  ngOnInit(): void {}

  closeSideBar() {
    this.dataService.sidenavOpened = false;
  }

  logout() {
    this.closeSideBar();
    this.authService.logout().subscribe();
    this.authService.user = undefined;
    this.router.navigateByUrl('/login');
  }
}
