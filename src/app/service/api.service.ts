import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { OptionsData } from '../interface/options-data';
import { environment } from 'src/environments/environment';
import { Measurement } from '../classes/measurement';

@Injectable({
  providedIn: 'root',
})
export class APIService {

  listType = [
    { id: 'latest', name: 'Legújabbak' },
    { id: 'free', name: 'Mentes receptek' },
    { id: 'daily', name: 'Napi ajánlat' },
    { id: 'popular', name: 'Népszerű receptek' },
    { id: 'appetiser', name: 'Előételek' },
    { id: 'soup', name: 'Levesek' },
    { id: 'maincourse', name: 'Főételek' },
    { id: 'sidedish', name: 'Köretek' },
    { id: 'dessert', name: 'Desszertek' },
    { id: 'drink', name: 'Italok' }
  ];

  private serverUrl: string = `${environment.apiUrl}/`;

  apiKey: string = '';
  filterArray = new Subject()

  private _categories = new BehaviorSubject<any[]>([]);
  private _costs = new BehaviorSubject<OptionsData[]>([]);
  private _nationalities = new BehaviorSubject<OptionsData[]>([]);
  private _difficulties = new BehaviorSubject<OptionsData[]>([]);
  private _labels = new BehaviorSubject<OptionsData[]>([]);
  private _measurements = new BehaviorSubject<Measurement[]>([]);
  
  
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
  get measurements() {
    return this._measurements.asObservable();
  }

  public isReady = new Subject<any>()

  constructor(
    private http: HttpClient,
   
  ) { 
    this.getCategories()
    this.getdifficulties()
    this.getCosts()
    this.getNationalities()
    this.getLabels()
    this.getMeasurements()
  }

  private isServerReady(): Observable<any> {
    return this.http
      .get<any[]>(this.serverUrl + '?ready=' + this.apiKey ,{ withCredentials: true })
  }

  private getCategories() {
    let query: string = this.serverUrl + '?categories'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .subscribe(data => this._categories.next(data))
  }
  
  private getdifficulties() {
    let query: string = this.serverUrl + '?difficulties'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .subscribe(data => this._difficulties.next(data))
  }
  
  private getCosts() {
    let query: string = this.serverUrl + '?costs'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .subscribe(data => this._costs.next(data))
  }
  
  private getNationalities() {
    let query: string = this.serverUrl + '?nationalities'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .subscribe(data => this._nationalities.next(data))
  }

  private getLabels() {
    let query: string = this.serverUrl + '?labels'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .subscribe(data => this._labels.next(data))
  }

  private getMeasurements() { 
    let query: string = this.serverUrl + '?measurements'
    this.http
      .get<any[]>(query,{ withCredentials: true })
      .subscribe(data => this._measurements.next(data))
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
      .post<any[]>(this.serverUrl + '?search', filterData)
  }

  
  public getRecipe(id: string): Observable<any[]> {
    return this.http
    .get<any[]>(this.serverUrl + '?recipe&id=' + id,{ withCredentials: true })
  }

  /**
   * 
   * @param formData 
   * @returns Observable<any>
   */
   public postRecipe(formData: any): Observable<any> {
    let fData = new FormData();
    fData.append('recipe',JSON.stringify(formData))

    for (let i = 0; i < formData.image.length; i++) {
      const ele = formData.image[i];
      fData.append(i.toString(), ele, ele.name)
    }

    return this.http
      .post<any[]>(this.serverUrl+ '?recipe', fData, { withCredentials: true })
   }

  public putRecipe(formData: any): Observable<any> {
    let fData = new FormData();
    fData.append('recipe',JSON.stringify(formData))
    fData.append('_method','PUT')

    for (let i = 0; i < formData.image.length; i++) {
      const ele = formData.image[i];
      fData.append(i.toString(), ele, ele.name)
    }

    return this.http
      .post<any[]>(this.serverUrl+ '?recipe&id=' + formData.recipeId, fData, { withCredentials: true })
  }

/**
   * 
   * @param listBy
   * @param page 
   * @param itemsPerPage 
   * @returns 
   */
  public list(listBy: string, page: number, itemsPerPage: number = 4, userId: string='0', recipeId: string = ''): Observable<any[]> {
   
  return this.http
    .get<any[]>(this.serverUrl +
      '?list&category=' + listBy + 
      '&page=' + page.toString() +
      '&itemsPerPage=' + itemsPerPage.toString() + 
      '&user=' + userId.toString() +
      '&recipe=' + recipeId, { withCredentials: true })
}
 
 
  public review(recipeId: number, userId: string, rating: number, comment: string=''): Observable<any> {
    let fData = new FormData();

    fData.append('recipeId', recipeId.toString())
    fData.append('userId', userId.toString())
    fData.append('comment', comment)
    fData.append('rating', rating.toString())

    return this.http
      .post<any[]>(this.serverUrl + '?review', fData, { withCredentials: true })
   } 

   public fridge(ingredients: string[], page: number, itemsPerPage: number = 4): Observable<any[]> {
    return this.http
    .get<any[]>(this.serverUrl + '?fridge&q=' + ingredients.join(',') + '&page=' + page.toString() + '&itemsPerPage=' + itemsPerPage.toString(),{ withCredentials: true })
  }

  //nem a REST API része
  public imageblob(url: string): Observable<any> {
    return this.http
      .get(url, {responseType: 'blob', withCredentials: true })
  }

  public subscribeGuest(email: string): Observable<any[]> {
    let fData = new FormData();
    if (email) {
      fData.append('subscribe','true')
      fData.append('email', email)
    }

    return this.http
      .post<any[]>(this.serverUrl + '?subscribe', fData, { withCredentials: true })
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
  }

  public deleteRecipe(recipeId: string | undefined) {
    return this.http
      .delete(this.serverUrl + '?recipe&id=' + recipeId)
  }

  /****Form Spree api */
  postContactData(body: any): Observable<any> {
    const url: string = 'https://formspree.io/f/mdoyqwew'
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let data = `name=${body.messageFrom}&email=${body.emailFrom}&message=${body.messageFrom}`;
    
     return this.http.post<any>(url, data, httpOptions)
  }
}
  
