import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AIOService {

  constructor() { }

  validDate(date: Date){
    return date.getDate() + '.' + (date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth() + 1) + '.' + date.getFullYear();
  }

  
  generateKey() {
    let library = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPWRSTUVWXYZ0123456789"
    let newPassword = "";
    for (var i = 0; i < 16; i++) {
      if (i == 4 || i == 8 || i == 12){
        newPassword += '-';
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
      else{
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
    }
    return newPassword;
  }
}
