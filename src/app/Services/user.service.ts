import { Observable, observable } from 'rxjs';
import { User } from './../user';
import { Injectable, OnInit } from '@angular/core';
import UsersData from './../Data/Users.json'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  systemUsers: User[] = UsersData;
  constructor() { }

  Register(user: User){
    this.systemUsers.push(user);
  }

  ValidateUser(userName: string, password: string): boolean {
    let fetchedUser = this.systemUsers.find(u => u.userName == userName && u.password == password);
    if (!fetchedUser) {
      return false;
    }
    return true;
  }
}
