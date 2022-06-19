import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user: User | undefined;
  private serverUrl: string = `${environment.apiUrl}/`;
    
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

  public logout(): Observable<any> {
    let fData = new FormData();
    fData.append('logout','logout');
    return this.http
      .post<any[]>(this.serverUrl+ '?logout', fData, { withCredentials: true })
  }
  
  public credentials(): Observable<any> {
    return this.http
      .get<any[]>(this.serverUrl+ '?credentials', { withCredentials: true })
  }

  public userlist(): Observable<any> {
    return this.http
      .get<any[]>(this.serverUrl+ '?userlist', { withCredentials: true })
  }

  public banUser(userId: string): Observable<any> { 
    let fData = new FormData();
    fData.append('id', userId);
    return this.http
      .post<any[]>(this.serverUrl+ '?banuser', fData, { withCredentials: true })
  }

  public activateUser(userId: string): Observable<any> { 
    let fData = new FormData();
    fData.append('id', userId);
    return this.http
      .post<any[]>(this.serverUrl+ '?activateuser', fData, { withCredentials: true })
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
  }

  public userUpdate(formData: any): Observable<any> { 
    let fData = new FormData();

    fData.append('id',formData.id);
    fData.append('name',formData.name);
    fData.append('email',formData.email);
    fData.append('description',formData.description);
    fData.append('passwordCurrent',formData.passwordCurrent);
    fData.append('passwordNew',formData.passwordNew);
    fData.append('passwordNewCheck',formData.passwordNewCheck);

    return this.http
      .post<any[]>(this.serverUrl+ '?user', fData, { withCredentials: true })
  }
  public avatarUpload(formData: any): Observable<any> { 
    let fData = new FormData();
    
    fData.append('id',formData.id);
    fData.append('avatar',formData.avatar);

    return this.http
      .post<any[]>(this.serverUrl+ '?avatar', fData, { withCredentials: true })
  }
  public avatarDelete(userId: string): Observable<any> { 
    let fData = new FormData();
    
    fData.append('id',userId);
    return this.http
      .post<any[]>(this.serverUrl+ '?avatar/delete', fData, { withCredentials: true })
  }

  public userInfo(id: string): Observable<any> {
    return this.http
    .get<any>(this.serverUrl + '?info&id=' + id)
  }

  public getFavorites(userId: string, page: number, itemsPerPage: number = 4): Observable<any[]> {
    return this.http
    .get<any[]>(this.serverUrl + '?favorites&user=' + userId + '&page=' + page.toString() + '&itemsPerPage=' + itemsPerPage.toString(),{ withCredentials: true })
  }

  public getFavoritesSimple(userId: string): Observable<any[]> {
    return this.http
    .get<any[]>(this.serverUrl + '?favorites/simple&user=' + userId,{ withCredentials: true })
  }

  public setFavorite(userId: string, recipeId: string, flag: boolean): Observable<any> {
    let fData = new FormData();
    fData.append('userId', userId);
    fData.append('recipeId', recipeId);
    fData.append('flag', flag.toString());
    return this.http
      .post<any[]>(this.serverUrl+ '?favorites', fData, { withCredentials: true })
  }

  public resetPassword(token: string, password1: string, password2: string): Observable<any> { 
    let fData = new FormData();
    fData.append('token', token);
    fData.append('password1', password1);
    fData.append('password2', password2);
    return this.http
      .post<any[]>(this.serverUrl+ '?reset', fData, { withCredentials: true })
  }

  public passwordRecovery(email: string): Observable<any> {
    let fData = new FormData();
    fData.append('email', email);
    return this.http
      .post<any[]>(this.serverUrl+ '?recovery', fData, { withCredentials: true })
  }

  public validateRecoveryToken(token: string): Observable<any> { 
    return this.http
      .get<any[]>(this.serverUrl+ '?recovery&token=' + token, { withCredentials: true })
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
