import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private apiService: APIService
  ) { }

  public checkConnection() {
    this.apiService.isServerReady().subscribe({
      next: data => console.log('data :>> ', data),
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
  public getRecipesByUser(id: number, page?: number) {
    this.apiService.serviceRecipesByUser(id, page).subscribe({
      next: data => console.log('data :>> ', data),
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
  public getRecipeSearch(
    text: string,
    categories?: number[],
    difficulity?: number[],
    nationality?: number[],
    cost?: number[],
    page: number = 1
  ) {
    this.apiService.serviceRecipeSearch(text, categories, difficulity, nationality, cost, page).subscribe({
      next: data => console.log('data :>> ', data),
      // error: err => console.error('uds',err.message),
      complete: () => ''
    })
  }
}
