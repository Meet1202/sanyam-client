import { Injectable } from '@angular/core';
import { User } from '../../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private user: User;

  constructor() { }

  setUser(user: User){
    this.user = user;
  }

  getUid(){
    return this.user.uid;
  }
}
