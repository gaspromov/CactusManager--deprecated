import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = 'api/v1/admin';
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) { }
  
  setHeader(){
    let token = localStorage.getItem('adminAccessToken');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  async newRegKey(key: string){
    this.setHeader();
    return await this.http.post(`${this.url}/regkey`, {key: key}, {headers: this.headers}).toPromise();
  }
}
