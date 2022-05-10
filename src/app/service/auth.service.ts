import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user: User | undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor() { }
}
