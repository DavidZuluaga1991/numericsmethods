import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  API_URL: string;
  httpOptions: any = {};
  constructor(private http: HttpClient) { 
    this.API_URL = `${environment.host}${environment.version}?${environment.appid}${environment.api_key}&${environment.input}`;
    this.httpOptions = {
      headers: new HttpHeaders({
        //'Accept': 'text/xml',
        'Content-Type': 'text/plain;charset=utf-8',
        //'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Header': 'Origin, X-Requested-With, Content-Type, Accept'
        //'Authorization': `Bearer ${environment.token}`
      })
    };
  
  }

  searchValue(formula: string){
    var url = `${this.API_URL}${formula}${environment.json}`;
    console.log(url);
    return this.http.get<any[]>(url, this.httpOptions);
  }
}
//google-chrome --disable-web-security -–allow-file-access-from-files