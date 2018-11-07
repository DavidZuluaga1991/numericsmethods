import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { NgxXml2jsonService } from 'ngx-xml2json'


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  API_URL: string;
  httpOptions: any = {};
  constructor(private http: HttpClient,private ngxXml2jsonService: NgxXml2jsonService) { 
    this.API_URL = `${environment.host}${environment.version}?${environment.appid}${environment.api_key}&${environment.input}`;
    this.httpOptions = {
      /*headers: new HttpHeaders({
        'Accept': 'text/xml',
        'Content-Type': 'text/xml'
        //'Content-Type': 'application/json',
        //'Authorization': `Bearer ${environment.token}`
      })*/
      headers: new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml')
    };
  
  }

  searchValue(formula: string){
    var url = `${this.API_URL}${formula}`;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        //'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': "text/xml; charset=\"utf-8\""
      }),
      responseType: 'text'
    };
    /*var u = this.http.get<any>(url, {responseType: 'text'});
    return u;*/
    /*const headers = new HttpHeaders({ 'Content-Type': 'text/xml' });
    headers.append('Accept', 'text/xml');
    headers.append('Content-Type', 'text/xml');*/
    /*const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
    this.http.get<any[]>(url, {headers: headers}).subscribe(response => {
      this.ngxXml2jsonService.xmlToJson(response);
      console.log(response);
      return '1234'
    });*/
    this.http.get(url, {headers: this.httpOptions,responseType: 'text'})
      .pipe(map(data => this.ngxXml2jsonService.xmlToJson(data)))
      .subscribe((data) => {
        // Data extraction from the HTTP response is already done
        // Display the result
        console.log('TJ user data', data);
      });
      
    /*return this.http.get(url, {headers: this.httpOptions,responseType: 'text'})
    .pipe(
        //data => this.log(url, data),
        //error => this.logError(filename, error)
        catchError(err => {
                 throw 'error in source. Details: ' + err;
               })
    );*/
  }
}
