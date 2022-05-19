import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user: User | undefined;
  private serverUrl: string = 'http://localhost/angular/rece-fice/src/api/';
  private imageUrl: string = 'http://localhost/angular/rece-fice/src/assets/'

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) { }

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
      .post<any[]>(this.serverUrl+ '?user', fData, { withCredentials: true })
      .pipe(
        catchError(err => of([])),
      );
  }
}
