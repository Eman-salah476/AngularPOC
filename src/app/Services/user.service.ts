import { User } from './../user';
import { Injectable, OnInit } from '@angular/core';
import UsersData from './../Data/Users.json';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  systemUsers: User[] = UsersData;
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  userCredential = new BehaviorSubject(null);
 
  Register(user: User) {
    this.systemUsers.push(user);
  }

  ValidateUser(userName: string, password: string): string {
    let fetchedUser = this.systemUsers.find(u => u.userName == userName && u.password == password);
    if (!fetchedUser) {
      return null;
    }
    return this.token;
  }

  GetUSerCredentials() {
    let token = JSON.stringify(localStorage.getItem('UserToken'));
    this.userCredential.next( jwtDecode(token));
    console.log(this.userCredential);
  }
}
