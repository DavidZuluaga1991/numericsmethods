import { Component, OnInit, Input } from '@angular/core';
import {  simplify } from 'mathjs';

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
