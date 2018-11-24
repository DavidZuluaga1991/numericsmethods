import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebases } from '../pages/integral/models/firebase';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  API_URL: string;
  httpOptions: any = {};


  constructor(private http: HttpClient,private db: AngularFireDatabase) { 
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

  
  /* FireBase */
  getHistorys(){
    let url = 'https://metodos-numericos-6384d.firebaseio.com/historys.json';
    return this.http.get(url);
  }
  getHistory(fire: firebases){

  }
  postHistory(fire: firebases){
    let count = 0;
    this.getHistorys().subscribe( (data: firebases[]) => {
      if(data!= undefined)
      {
        count = data.length;
      }
      this.db.database.ref('historys/'+count).set(fire);
    });
    //this.db.list('/historys').push(fire);
  }
}