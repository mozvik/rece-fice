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



  recipeSearch(
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
  

  public getImgBlob(url: string): Observable<any> {
    return this.http
      .get(url, {responseType: 'blob'})
      .pipe(
      //catchError(this.handleError)
    );
    
  }

  public getRecipes(idList: string[], page: number, itemsPerPage: number = 4 ): Observable<any[]> {
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

  public getRecipesBy(searchMethod: string, page: number, itemsPerPage: number = 5 ): Observable<any[]> {
    let fData = new FormData();
    if (searchMethod) {
      fData.append('getRecipesBy','true')
      fData.append('searchMethod', searchMethod)
      fData.append('page', page.toString())
      fData.append('itemsPerPage', itemsPerPage.toString())
    }

    return this.http
    .post<any[]>(this.serverUrl, fData)
      .pipe(
      //catchError(this.handleError)
    );
  }

  public getRecipesByCategory(category: string, page: number, itemsPerPage: number = 4 ): Observable<any[]> {
    let fData = new FormData();
    if (category) {
      fData.append('getRecipesByCategory','true')
      fData.append('category', category)
      fData.append('page', page.toString())
      fData.append('itemsPerPage', itemsPerPage.toString())
    }

    return this.http
    .post<any[]>(this.serverUrl, fData)
      .pipe(
      //catchError(this.handleError)
    );
  }

  public getRecipesFridge(ingredientList: string[], page: number, itemsPerPage: number = 8 ): Observable<any[]> {
    let fData = new FormData();
    if (ingredientList &&
      ingredientList.length > 0) {
      fData.append('getRecipesFridge','true')
      fData.append('page', page.toString())
      fData.append('itemsPerPage', itemsPerPage.toString())
      for (let i = 0; i < ingredientList.length; i++) {
         const ele = ingredientList[i];
        fData.append('ingredientList[]',ele)
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

  public deleteRecipe(recipeId: string | undefined): Observable<any[]> {
    let fData = new FormData();
    if (recipeId) {
      fData.append('deleteRecipe',recipeId)
    }
    return this.http
    .post<any[]>(this.serverUrl, fData)
      .pipe(
      //catchError(this.handleError)
    );
  }


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
  
