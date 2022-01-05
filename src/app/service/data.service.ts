import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: any = {
    id: '',
    name: '', 
    hasUploadAccess: false
  };

  public costList: any = [{
    id: '',
    name: '', 
    selected: '1'
  }];
  public categoryList: any[] = [];
  public difficulityList: any[] = [];
  public nationalityList: any[] = [];
  public labelList: any[] = [];
  public displaySize!: number
  public advancedSearchIsOpen: boolean = false
 
  

  constructor(
    private apiService: APIService
  ) {
    
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
  
  public getCategoryList( sqlTableName: string ): any {
    this.apiService.serviceGetList(sqlTableName).subscribe({
      next: data => {
        switch (sqlTableName) {
          case 'cost':
            this.costList = data.items.map((item: any) => ({ ...item, selected: false }))
            //this.costList.forEach( (item:any) => item.selected = false) //ez is jó
            break;
          case 'category':
            this.categoryList = data.items.map((item: any) => ({ ...item, selected: false }))
            break;
          case 'difficulity':
            this.difficulityList = data.items.map((item: any) => ({ ...item, selected: false }))
            break;
          case 'nationality':
            this.nationalityList = data.items.map((item: any) => ({ ...item, selected: false }))
            break;
          case 'label':
            this.labelList = data.items.map((item: any) => ({ ...item, selected: false }))
            break;
          default:
            break;
        }
      },
      // error: err => console.error('uds',err.message),
      complete: () => ''
    })
  }

  
  
}
