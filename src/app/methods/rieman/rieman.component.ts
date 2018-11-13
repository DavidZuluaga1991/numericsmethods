import { Component, OnInit, Input } from '@angular/core';
import {  simplify } from 'mathjs';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-rieman',
  templateUrl: './rieman.component.html',
  styleUrls: ['./rieman.component.css']
})


export class RiemanComponent implements OnInit {

  @Input() public valmin: number = 0;
  @Input() public valmax: number = 0;
  @Input() public valitera: number = 0;
  @Input() public valeval: string= "";
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']

  dataSource = ELEMENT_DATA;
  constructor() { 
    
  }
  ngOnInit() {
    this.mathMethods();
  }
  
  mathMethods() {
    let current: number = this.valmin;
    let max: number  = this.valmax;
    let itera: number  = this.valitera;

    console.log("this.valuemin", current);
    console.log("this.valuemax", max);
    console.log("this.valueitera", itera);

    let id = 0;
    let iterations = [];
    while (current < max) {
      id += 1;
      let evl = this.evaluar(current);

      iterations.push({
        id,
        xi : current,
        fxi : evl,
        ai: evl * itera
      })
      current += itera;
    }

    console.log("iterations" , iterations);
  }

  /* Evaluar en la formula sin integrar */
  evaluar( value : number ){
    //Variable que se utiliza como temporal mientras se recorre el metodo.
    let evl = "";
    //Ciclo para recorrer el string o valor de la funcion para wolfram
    for (let i = 0; i < this.valeval.length; i++) {
      //Condicion para encontrar la variable (x) y reemplazarla por value
      if(this.valeval.charAt(i) == "x"){
        evl+= value;
      }
      else{
        evl += this.valeval.charAt(i);
      }
    }
    //funcion simplify de mathjs para evaluar la funcion en string.
    return Number(simplify(evl));
  }
}
