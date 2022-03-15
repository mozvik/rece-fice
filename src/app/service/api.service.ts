import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AsyncSubject, BehaviorSubject, catchError, debounceTime, delay, distinctUntilChanged, first, map, Observable, of, ReplaySubject, share, shareReplay, Subject, take, throwError, timeout } from 'rxjs';
import { OptionsData } from '../interface/options-data';
import { Recipe } from '../classes/recipe';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  //serverUrl: string = 'https://https:/teszt.esoguides.hu/api/';
  serverUrl: string = 'http://localhost/angular/rece-fice/api/';
  apiKey: string = '';
  filterArray = new Subject()

  
  public categories = new Subject<any>();
  public costs = new Subject<any>();
  public nationalities = new Subject<any>();
  public difficulities = new Subject<any>();
  public labels = new Subject<any>();
  
  public isReady = new Subject<any>()

  


  private isServerReady(): Observable<any> {
    console.log('isServerReady emits :>> ');
    return this.http
      .get<any[]>(this.serverUrl + '?ready=' + this.apiKey)
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      ;
  }

  private getCategories(): Observable<any>{
    let query: string = this.serverUrl + '?list=category&apikey=' + this.apiKey
    console.log('getCategories emits :>> ');
    return this.http
      .get<any[]>(query)
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      ;
  }
  
  private getDifficulities(): Observable<any> {
    let query: string = this.serverUrl + '?list=difficulity&apikey=' + this.apiKey
    return this.http
      .get<any[]>(query)
  }
  
  private getCosts(): Observable<any> {
    let query: string = this.serverUrl + '?list=cost&apikey=' + this.apiKey
    return this.http
      .get<any[]>(query)
  }
  
  private getNationalities(): Observable<any> {
    let query: string = this.serverUrl + '?list=nationality&apikey=' + this.apiKey
    return this.http
      .get<any[]>(query)
  }

  private getLabels(): Observable<any> {
    let query: string = this.serverUrl + '?list=label&apikey=' + this.apiKey
    return this.http
      .get<any[]>(query)
  }



  serviceRecipeSearch(
    text: string,
    filters: any,
    justNumberOfResults: boolean = true, 
    page: number = 10
  ): Observable<any> {
    let filterData = {...filters}
    filterData.text = text
    filterData.justNumberOfResults = justNumberOfResults
    filterData.page = page
    return this.http
      .post<any[]>(this.serverUrl, filterData)
      .pipe(
        // catchError(this.handleError),
      );
  }

  public postRecipeImages(
    file: File
  ): Observable<any> {
    
    let fData = new FormData();
    fData.append('file', file)
    fData.append('submit', 'images')

    return this.http
      .post<any[]>(this.serverUrl, fData)
      .pipe(
        catchError(this.handleError),
      );
  }

  public postRecipe(
    formData: any
  ): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        
      })
    }
    
    let fData = new FormData();
    
    fData.append('postRecipe',JSON.stringify(formData))

    for (let i = 0; i < formData.image.length; i++) {
      const ele = formData.image[i];
      fData.append(i.toString(), ele, ele.name)
      
    }
    

    console.log('fd :>> ',fData);

    
    
    
    return this.http
      .post<any[]>(this.serverUrl, fData)
      .pipe(
        //catchError(this.handleError),
      );
  }


////////felulvizsgalat szükséges
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

  
  

  
  
  
  multiFilter(filter: any[]): Observable<any> {
     let query: string = this.serverUrl + '?ready=' + this.apiKey //temp
    console.log('filter :>> ', filter);
    return this.http
    .get<any[]>(query)
    .pipe(
    catchError(this.handleError)
  );
  }
//////felülvizsg eddig




 /**
 * Http hibakód kezelése
 * @param operation - hiba
 */
  private handleError(error: HttpErrorResponse) {
    console.log(`The backend returned an unsuccessful response code: ${error} - ${error.status} - ${error.message}`);
    return throwError(() => 'Something bad happened; please try again later.');
  };

  constructor(
    private http: HttpClient,
  ) { 
      this.isServerReady().subscribe(this.isReady)
      this.getCategories().subscribe(this.categories)
      this.getDifficulities().subscribe(this.difficulities)
      this.getCosts().subscribe(this.costs)
      this.getNationalities().subscribe(this.nationalities)
      this.getLabels().subscribe(this.labels)
    }
}
  
