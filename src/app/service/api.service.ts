import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  //serverUrl: string = 'https://https:/teszt.esoguides.hu/api/';
  serverUrl: string = 'http://localhost/angular/rece-fice/api/';
  apiKey: string = '';
  observables: any = {}

  constructor(
    private http: HttpClient,
    ) { }

  isServerReady(): Observable<any> {
    return this.http
      .get<any[]>(this.serverUrl + '?ready=' + this.apiKey)
      .pipe(
      catchError(this.handleError)
    );
  }
  serviceRecipesBy(id: number, searchBy: string, page?: number): Observable<any> {
    let query: string = this.serverUrl + '?' + searchBy + '=' + id
    if (page) query += '&page=' + page
    query += '&apikey=' + this.apiKey
    return this.http
      .get<any[]>(query)
      .pipe(
      catchError(this.handleError)
    );
  }

  serviceRecipesByLabel(id: number[], page?: number): Observable<any> {
    let query: string = this.serverUrl + '?'
    for (const item of id) {
      query += 'label[]=' + item + '&'
    }
    query += 'apikey=' + this.apiKey
    if (page) query += '&page=' + page
    
    return this.http
      .get<any[]>(query)
      .pipe(
      catchError(this.handleError)
    );
  }
  serviceRecipesByUser(id: number, page?: number): Observable<any> {
    let query: string = this.serverUrl + '?user=' + id + '&apikey=' + this.apiKey
    if (page) query += '&page=' + page
    
    return this.http
      .get<any[]>(query)
      .pipe(
      catchError(this.handleError)
    );
  }
  serviceRecipeById(id: number): Observable<any> {
    let query: string = this.serverUrl + '?recipe=' + id + '&apikey=' + this.apiKey
    return this.http
      .get<any[]>(query)
      .pipe(
      catchError(this.handleError)
    );
  }

  serviceRecipeSearch(
    text: string,
    categories?: number[],
    difficulity?: number[],
    nationality?: number[],
    cost?: number[],
    page?: number
    ): Observable<any> {
    let query: string = this.serverUrl + '?search=' + text + '&'
    if (categories) {
      for (const item of categories) {
        query += 'category[]=' + item + '&'
      }
    }
    if (difficulity) {
      for (const item of difficulity) {
        query += 'difficulity[]=' + item + '&'
      }
    }
    if (nationality) {
      for (const item of nationality) {
        query += 'nationality[]=' + item + '&'
      }
    }
    if (cost) {
      for (const item of cost) {
        query += 'cost[]=' + item + '&'
      }
    }
    query += 'apikey=' + this.apiKey
    if (page) query += '&page=' + page
    console.log('query :>> ', query);
    return this.http
      .get<any[]>(query)
      .pipe(
      catchError(this.handleError)
    );
  }
 /**
 * Http hibakód kezelése
 * @param operation - hiba
 */
  private handleError(error: HttpErrorResponse) {
    console.log(`The backend returned an unsuccessful response code: ${error.status}`);
    return throwError(() => 'Something bad happened; please try again later.');
  };
}
  
