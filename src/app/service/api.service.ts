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
  // serverUrl: string = 'http://localhost/angular/rece-fice/api/';
  serverUrl: string = 'http://localhost/angular/rece-fice/src/api/';
  imageUrl: string = 'http://localhost/angular/rece-fice/src/assets/'
  apiKey: string = '';
  filterArray = new Subject()

  
  public categories = new Subject<any>();
  public costs = new Subject<any>();
  public nationalities = new Subject<any>();
  public difficulities = new Subject<any>();
  public labels = new Subject<any>();
  
  public isReady = new Subject<any>()

  searchResults: any

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

  /**
   * 
   * @param formData 
   * @param method default:"postRecipe" || "updateRecipe"
   * @returns Observable<any>
   */
  public postRecipe(
    formData: any, method:string = 'postRecipe',
  ): Observable<any> {
    
    let fData = new FormData();
    
    fData.append(method,JSON.stringify(formData))

    for (let i = 0; i < formData.image.length; i++) {
      const ele = formData.image[i];
      console.log('object :>> ', formData.image);
      fData.append(i.toString(), ele, ele.name)
      
    }

    return this.http
      .post<any[]>(this.serverUrl, fData)
      .pipe(
        //catchError(this.handleError),
      );
  }
  // public getImgBlob(url: string) {
  //   fetch(url)
  //     .then(response => {
  //       console.log('response :>> ', response);
  //       response.blob().then(blob => {
  //         const t = new File([blob], 'ww')
  //         console.log('t :>> ', t);
  //         return t
  //       })
  //     })
  // }

  public getImgBlob(url: string): Observable<any> {
    return this.http
      .get(url, {responseType: 'blob'})
      .pipe(
      //catchError(this.handleError)
    );
    // fetch(url)
    //   .then(response => {
    //     console.log('response :>> ', response);
    //     response.blob().then(blob => {
    //       const t = new File([blob], 'ww')
    //       console.log('t :>> ', t);
    //       return t
    //     })
    //   })
  }

  public getRecipes(idList: string[], page: number, itemsPerPage: number = 5 ): Observable<any[]> {
    let fData = new FormData();
    if (idList) {
      fData.append('getRecipes','true')
      fData.append('page', page.toString())
      fData.append('itemsPerPage', itemsPerPage.toString())
      for (let i = 0; i < idList.length; i++) {
         const ele = idList[i];
        fData.append('idList[]',ele)
      }
    }

    return this.http
    .post<any[]>(this.serverUrl, fData)
      .pipe(
      //catchError(this.handleError)
    );
  }

  public getRecipesByUser(userID: string, page: number, itemsPerPage: number = 5 ): Observable<any[]> {
    let fData = new FormData();
    if (userID) {
      fData.append('getRecipesByUser',userID)
      fData.append('page', page.toString())
      fData.append('itemsPerPage', itemsPerPage.toString())
    }

    return this.http
    .post<any[]>(this.serverUrl, fData)
      .pipe(
      //catchError(this.handleError)
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
  
