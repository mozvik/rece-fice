import { HostListener, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { APIService } from './api.service';
import { OptionsData } from '../interface/options-data';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: any = {
    id: '',
    name: '', 
    hasUploadAccess: false
  };

  public costList: OptionsData[] = [];
  public categoryList: OptionsData[] = [];
  public difficulityList: OptionsData[] = [];
  public difficulities: ReplaySubject<OptionsData[]> = new ReplaySubject<OptionsData[]>(1);
  public nationalityList: OptionsData[] = [];
  public labelList: OptionsData[] = [];
  public displaySize!: number
  public searchIsOpen: boolean = false
  public sidenavOpened: boolean = false;
  public currentScreenSize: string = ""

   // Create a map to display breakpoint names for demonstration purposes.
   displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  

  constructor(
    private apiService: APIService,
    breakpointObserver: BreakpointObserver
  ) {
      breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
    });
   }

  public toggleSearch(): boolean{
    this.searchIsOpen = !this.searchIsOpen
    return this.searchIsOpen
  }
  public toggleSidenav(): boolean{
    this.sidenavOpened = !this.sidenavOpened
    return this.sidenavOpened
  }
  
  
  public checkConnection() {
    this.apiService.isServerReady().subscribe({
      next: data => {
        console.log('data :>> ', data)
      },
      // error: err => console.error('uds',err.message),
      complete: () => ''
    })
  }
  public getRecipesBy(id: number, searchBy: string, page?: number) {
    this.apiService.serviceRecipesBy(id, searchBy, page).subscribe({
      next: data => console.log('data :>> ', data),
      // error: err => console.error('uds',err.message),
      complete: () => ''
    })
  }
  public getRecipesByLabel(id: number[], page?: number) {
    this.apiService.serviceRecipesByLabel(id, page).subscribe({
      next: data => console.log('data :>> ', data),
      // error: err => console.error('uds',err.message),
      complete: () => ''
    })
  }
  public getRecipesByUser(id: number, page?: number):any {
    this.apiService.serviceRecipesByUser(id, page).subscribe({
      next:  data => console.log('data :>> ', data),
      // error: err => console.error('uds',err.message),
      complete: () => ''
    })
  }
  public getRecipeById(id: number) {
    this.apiService.serviceRecipeById(id).subscribe({
      next: data => console.log('data :>> ', data),
      // error: err => console.error('uds',err.message),
      complete: () => ''
    })
  }
  
 

  
  
}
