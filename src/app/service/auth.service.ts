import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user: User | undefined;
  private serverUrl: string = 'http://localhost/angular/rece-fice/src/api/';
    
  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { 
    
  }

  public login(formData: any): Observable<any> {
    let fData = new FormData();
    
    fData.append('email',formData.email);
    fData.append('password',formData.password);

    return this.http
      .post<any[]>(this.serverUrl+ '?login', fData, { withCredentials: true })
      .pipe(
        catchError(err => of([])),
      );
  }
  
  public credentials(): Observable<any> {
    return this.http
      .get<any[]>(this.serverUrl+ '?credentials', { withCredentials: true })
      .pipe(
        catchError(err => of([])),
      );
  }

  public register(formData: any): Observable<any> { 
    let fData = new FormData();

    fData.append('name',formData.name);
    fData.append('email',formData.email);
    fData.append('passwordNew',formData.passwordNew);
    fData.append('passwordConfirm',formData.passwordConfirm);
    fData.append('gdpr',formData.gdpr);
    fData.append('subscribe',formData.subscribe);

    return this.http
      .post<any[]>(this.serverUrl+ '?register', fData, { withCredentials: true })
      .pipe(
        
      );
  }

  public userUpdate(formData: any): Observable<any> { 
    let fData = new FormData();
    // console.log('formData :>> ', formData);
    fData.append('id',formData.id);
    fData.append('name',formData.name);
    fData.append('email',formData.email);
    fData.append('description',formData.description);
    fData.append('passwordCurrent',formData.passwordCurrent);
    fData.append('passwordNew',formData.passwordNew);
    fData.append('passwordNewCheck',formData.passwordNewCheck);

    return this.http
      .post<any[]>(this.serverUrl+ '?user', fData, { withCredentials: true })
      .pipe(
        catchError(err => of([])),
      );
  }
  public avatarUpload(formData: any): Observable<any> { 
    let fData = new FormData();
    
    fData.append('id',formData.id);
    fData.append('avatar',formData.avatar);

    return this.http
      .post<any[]>(this.serverUrl+ '?avatar', fData, { withCredentials: true })
      .pipe(
        catchError(err => of([])),
      );
  }
  public avatarDelete(userId: string): Observable<any> { 
    let fData = new FormData();
    
    fData.append('id',userId);
    return this.http
      .post<any[]>(this.serverUrl+ '?avatar/delete', fData, { withCredentials: true })
      .pipe(
        catchError(err => of([])),
      );
  }

  public userInfo(id: string): Observable<any> {
    return this.http
    .get<any>(this.serverUrl + '?info&id=' + id)
      .pipe(
      //catchError(this.handleError)
    );
  }

  getFavorites(userId: string): Observable<any[]> {
    return this.http
    .get<any[]>(this.serverUrl + '?favorites&user=' + userId,{ withCredentials: true })
  }

  setFavorite(userId: string, recipeId: string, flag: boolean): Observable<any> {
    let fData = new FormData();
    fData.append('userId', userId);
    fData.append('recipeId', recipeId);
    fData.append('flag', flag.toString());
    return this.http
      .post<any[]>(this.serverUrl+ '?favorites', fData, { withCredentials: true })
  }


  private getPHPessionId(){
    let ele: any = document.cookie.match(/PHPSESSID=[^;]+/);
    let phpSession = undefined
    if(ele != null) {
      if (ele instanceof Array) {
        phpSession = ele[0].substring(11);
        }
      else {
        phpSession = ele.substring(11);
        }
    }
    return phpSession
}
}
