import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AsyncSubject, BehaviorSubject, catchError, debounceTime, delay, distinctUntilChanged, first, map, Observable, of, ReplaySubject, share, shareReplay, Subject, take, throwError, timeout } from 'rxjs';
import { OptionsData } from '../interface/options-data';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  //serverUrl: string = 'https://https:/teszt.esoguides.hu/api/';
  serverUrl: string = 'http://localhost/angular/rece-fice/api/';
  apiKey: string = '';
  filterArray = new Subject()

  
  public categories = new ReplaySubject<any>(1);
  public costs = new ReplaySubject<any>(1);
  public nationalities = new ReplaySubject<any>(1);
  public difficulities = new ReplaySubject<any>(1);
  public labels = new ReplaySubject<any>(1);
  
  
  constructor(
    private http: HttpClient,
  ) { 
      //this.filterArray.subscribe((val:any) => {
        // console.log(this.multiFilter(val))
      //})
    }

  
  
  
  // isServerReady(): Observable<any> {
  //   return this.http
  //     .get<any[]>(this.serverUrl + '?ready=' + this.apiKey)
  //     .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  isServerReady(): Observable<any> {
    return  this.http
      .get<any[]>(this.serverUrl + '?ready=' + this.apiKey)
      .pipe(
        timeout(500),
        catchError(this.handleError))
      ;
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
    filters: any,
    justNumberOfResults: boolean = true, 
    page: number = 10
  ): Observable<any> {
    filters.text = text
    filters.justNumberOfResults = justNumberOfResults
    filters.page = page

    return this.http
      .post<any[]>(this.serverUrl, filters)
      .pipe(
        // catchError(this.handleError),
      );
  }

  // serviceGetList( sqlTableName: string ): Observable<any> {
  //   let query: string = this.serverUrl + '?list=' + sqlTableName + '&apikey=' + this.apiKey
  //   return this.http
  //     .get<any[]>(query)
  //     .pipe(
  //     shareReplay(1),
  //     catchError(this.handleError)
  //   )
  // }
  

  getDifficulities() {
    let query: string = this.serverUrl + '?list=difficulity&apikey=' + this.apiKey
    this.http
      .get<any[]>(query)
      .subscribe
      (
        (response: any) => {this.difficulities.next(response)}
      ),
      (err: any) => console.error("loadDifficulities: ERROR")
  }

  getCategories() {
    let query: string = this.serverUrl + '?list=category&apikey=' + this.apiKey
    this.http
    .get<any[]>(query)
    .subscribe
      (
        (response: any) => {this.categories.next(response)}
      ),
      (err: any) => console.error("loadCategories: ERROR")
  }
  getCosts() {
    let query: string = this.serverUrl + '?list=cost&apikey=' + this.apiKey
    this.http
      .get<any[]>(query)
      .subscribe
      (
        (response: any) => {this.costs.next(response)}
      ),
      (err: any) => console.error("loadCosts: ERROR")
  }
  getNationalities() {
    let query: string = this.serverUrl + '?list=nationality&apikey=' + this.apiKey
    this.http
      .get<any[]>(query)
      .subscribe
      (
        (response: any) => {this.nationalities.next(response)}
      ),
      (err: any) => console.error("loadNationalities: ERROR")
  }
  getLabels() {
    let query: string = this.serverUrl + '?list=label&apikey=' + this.apiKey
    this.http
      .get<any[]>(query)
      .subscribe
      (
        (response: any) => {this.labels.next(response)}
      ),
      (err: any) => console.error("loadLabels: ERROR")
  }
  
  multiFilter(filter: any[]): Observable<any> {
     let query: string = this.serverUrl + '?ready=' + this.apiKey //temp
    console.log('filter :>> ', filter);
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
    console.log(`The backend returned an unsuccessful response code: ${error.status} - ${error.message}`);
    return throwError(() => 'Something bad happened; please try again later.');
  };
}
  
