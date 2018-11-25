import { Component, OnInit, Input } from '@angular/core';
import { parse,simplify } from 'mathjs';

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
  displayedColumns: string[] = ['id', 'xi', 'fxi', 'ai']

  dataSource = [];
  constructor() { 
    
  }
  ngOnInit() {
    this.mathMethods();
  }
  
  mathMethods() {
    let current: number = this.valmin;
    let max: number  = this.valmax;
    let itera: number  = this.valitera;

    //console.log("this.valuemin", current);
    //console.log("this.valuemax", max);
    //console.log("this.valueitera", itera);

    let id = 0;
    let iterations = [];
    while (current < max) {
      id += 1;
      let evl = this.evaluar(current);

      iterations.push({
        id,
        xi : current.toFixed(20),
        fxi : evl.toFixed(20),
        ai: (evl * itera).toFixed(20)
      })
      current += itera;
    }
    this.dataSource = iterations;
    //console.log("iterations" , iterations);
  }

  /* Evaluar en la formula sin integrar */
  evaluar( value : number ){
    
    //Variable que se utiliza como temporal mientras se recorre el metodo.
    /*let evl = "";
    //Ciclo para recorrer el string o valor de la funcion para wolfram
    for (let i = 0; i < this.valeval.length; i++) {
      //Condicion para encontrar la variable (x) y reemplazarla por val
      if(this.valeval.charAt(i) == "x"){
        evl+= "(" + value + ")";
      }
      else{
        evl += this.valeval.charAt(i);
      }
    }
    let pru = simplify(evl);
    let val : number = Number.parseFloat(pru.toString());*/
    let node = parse(this.valeval) 
    let eval2 = node.eval({x: value})   
    //2(-2.8)+3(-2.8)^2
    //let val = ((simplify(evl).toin / (10 ** 4))*(10 ** 4));
    //funcion simplify de mathjs para evaluar la funcion en string.
    return Number(eval2);
  }
}
