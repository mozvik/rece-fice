import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, Subject,  throwError, timeout } from 'rxjs';
import { OptionsData } from '../interface/options-data';

// enum ListRequestName{
//   latest = 'latest',
//   free = 'free',
//   daily = 'daily',
//   popular = 'popular',
//   categoryAppetiser = 'appetiser',
//   categorySoup = 'soup',
//   categorymaincourse = 'maincourse',
//   categorysidedish = 'sidedish',
//   categoryDessert = 'dessert',
//   categoryDrink = 'drink',
// }

@Injectable({
  providedIn: 'root',
})
export class APIService {

  listType = [
    { id: 'latest', name: 'Legújabbak' },
    { id: 'free', name: 'Mentes receptek' },
    { id: 'daily', name: 'Napi ajánlat' },
    { id: 'popular', name: 'Népszerű receptek' },
    { id: 'appetiser', name: 'Élőételek' },
    { id: 'soup', name: 'Levesek' },
    { id: 'maincourse', name: 'Főételek' },
    { id: 'sidedish', name: 'Köretek' },
    { id: 'dessert', name: 'Desszertek' },
    { id: 'drink', name: 'Italok' }
  ];

  //serverUrl: string = 'https://https:/teszt.esoguides.hu/api/';
  // serverUrl: string = 'http://localhost/angular/rece-fice/api/';
  serverUrl: string = 'http://localhost/angular/rece-fice/src/api/';
  imageUrl: string = 'http://localhost/angular/rece-fice/src/assets/'
  apiKey: string = '';
  filterArray = new Subject()

  private _categories = new BehaviorSubject<any[]>([]);
  private _costs = new BehaviorSubject<OptionsData[]>([]);
  private _nationalities = new BehaviorSubject<OptionsData[]>([]);
  private _difficulties = new BehaviorSubject<OptionsData[]>([]);
  private _labels = new BehaviorSubject<OptionsData[]>([]);
  
  
  get categories() {
    return this._categories.asObservable();
  }
  get costs() {
    return this._costs.asObservable();
  }
  get nationalities() {
    return this._nationalities.asObservable();
  }
  get difficulties() {
    return this._difficulties.asObservable();
  }
  get labels() {
    return this._labels.asObservable();
  }  
  public isReady = new Subject<any>()

  //searchResults: any

  private isServerReady(): Observable<any> {
    console.log('isServerReady emits :>> ');
    return this.http
      .get<any[]>(this.serverUrl + '?ready=' + this.apiKey ,{ withCredentials: true })
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      ;
  }

  private getCategories() {
    let query: string = this.serverUrl + '?categories'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      .subscribe(data => {
        this._categories.next(data)
        console.log('getCategories emits :>> ', data.length);
      })
  }
  
  private getdifficulties() {
    let query: string = this.serverUrl + '?difficulties'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      .subscribe(data => this._difficulties.next(data))
  }
  
  private getCosts() {
    let query: string = this.serverUrl + '?costs'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      .subscribe(data => this._costs.next(data))
  }
  
  private getNationalities() {
    let query: string = this.serverUrl + '?nationalities'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      .subscribe(data => this._nationalities.next(data))
  }

  private getLabels() {
    let query: string = this.serverUrl + '?labels'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .pipe(
        timeout(1000),
        catchError(this.handleError))
      .subscribe(data => this._labels.next(data))
  }

  public search(
    text: string,
    filters: any,
    page: number,
    itemsPerPage: number = 4
  ): Observable<any> {
    let filterData = {...filters}
    filterData.text = text
    filterData.page = page
    filterData.itemsPerPage = itemsPerPage
    return this.http
      .post<any[]>(this.serverUrl + '?search', filterData, { withCredentials: true })
      .pipe(
        
      
      );
  }

  
  public getRecipe(id: string): Observable<any[]> {
    return this.http
    .get<any[]>(this.serverUrl + '?recipe&id=' + id,{ withCredentials: true })
      .pipe(
      //catchError(this.handleError)
    );
  }

  /**
   * 
   * @param formData 
   * @returns Observable<any>
   */
   public postRecipe(formData: any): Observable<any> {
    let fData = new FormData();
    console.log('formData :>> ', formData);
    fData.append('recipe',JSON.stringify(formData))

    for (let i = 0; i < formData.image.length; i++) {
      const ele = formData.image[i];
      console.log('object :>> ', formData.image);
      fData.append(i.toString(), ele, ele.name)
    }

    return this.http
      .post<any[]>(this.serverUrl+ '?recipe', fData, { withCredentials: true })
      .pipe(
        //catchError(this.handleError),
      );
   }
   /**
   * 
   * @param formData 
   * @returns Observable<any>
   */
    
  
  /**
   * 
   * @param formData 
   * @returns Observable<any>
   */
   public putRecipe(formData: any): Observable<any> {
    let fData = new FormData();
    console.log('formData :>> ', formData);
    fData.append('recipe',JSON.stringify(formData))
    fData.append('_method','PUT')

    for (let i = 0; i < formData.image.length; i++) {
      const ele = formData.image[i];
      console.log('object :>> ', formData.image);
      fData.append(i.toString(), ele, ele.name)
    }

    return this.http
      .post<any[]>(this.serverUrl+ '?recipe&id=' + formData.recipeId, fData, { withCredentials: true })
      .pipe(
        //catchError(this.handleError),
      );
  }

/**
   * 
   * @param listBy
   * @param page 
   * @param itemsPerPage 
   * @returns 
   */
  public list(listBy: string, page: number, itemsPerPage: number = 4, userId: number=0): Observable<any[]> {
   
  return this.http
    .get<any[]>(this.serverUrl +
      '?list&category=' + listBy + 
      '&page=' + page.toString() +
      '&itemsPerPage=' + itemsPerPage.toString() + 
      '&user=' + userId.toString(),{ withCredentials: true })
    .pipe(
    catchError(this.handleError)
  );
}
 
 
  public review(recipeId: number, userId: number, rating: number, comment: string=''): Observable<any> {
    let fData = new FormData();

    fData.append('recipeId', recipeId.toString())
    fData.append('userId', userId.toString())
    fData.append('comment', comment)
    fData.append('rating', rating.toString())

    return this.http
      .post<any[]>(this.serverUrl + '?review', fData, { withCredentials: true })
      .pipe(
        //catchError(this.handleError),
      );
   } 

   public fridge(ingredients: string[], page: number, itemsPerPage: number = 4): Observable<any[]> {
    return this.http
    .get<any[]>(this.serverUrl + '?fridge&q=' + ingredients.join(',') + '&page=' + page.toString() + '&itemsPerPage=' + itemsPerPage.toString(),{ withCredentials: true })
      .pipe(
      //catchError(this.handleError)
    );
  }

  //nem a REST API része
  public imageblob(url: string): Observable<any> {
    return this.http
      .get(url, {responseType: 'blob', withCredentials: true })
      .pipe(
      //catchError(this.handleError)
    );
  }

  public subscribeGuest(email: string): Observable<any[]> {
    let fData = new FormData();
    if (email) {
      fData.append('subscribe','true')
      fData.append('email', email)
    }

    return this.http
      .post<any[]>(this.serverUrl + '?subscribe', fData, { withCredentials: true })
      .pipe(
      catchError(this.handleError)
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
    .post<any[]>(this.serverUrl, fData, { withCredentials: true })
      .pipe(
      //catchError(this.handleError)
    );
  }

  public deleteRecipe(recipeId: string | undefined) {
    return this.http
      .delete(this.serverUrl + '?recipe&id=' + recipeId)
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
    return throwError(() => error.error);
  };

  constructor(
    private http: HttpClient,
  ) { 
    this.getCategories()
    this.getdifficulties()
    this.getCosts()
    this.getNationalities()
    this.getLabels()
      // this.isServerReady().subscribe(this.isReady)
      // this.getCategories().subscribe(this.categories)
      // this.getdifficulties().subscribe(this.difficulties)
      // this.getCosts().subscribe(this.costs)
      // this.getNationalities().subscribe(this.nationalities)
      // this.getLabels().subscribe(this.labels)
    }
}
  
