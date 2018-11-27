import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { parse, simplify } from 'mathjs';

@Component({
  selector: 'app-trapecio',
  templateUrl: './trapecio.component.html',
  styleUrls: ['./trapecio.component.css']
})
export class TrapecioComponent implements OnInit {

  @Input() public valmin: number = 0;
  @Input() public valmax: number = 0;
  @Input() public valitera: number = 0;
  @Input() public resultintegral: number = 0;
  @Input() public valeval: string = "";
  @Output() public errortrapecio = new EventEmitter();
  displayedColumns: string[] = ['id', 'xi', 'fxi', 'fxii', 'ai'];

  dataSource = [];
  constructor() { }

  ngOnInit() {
    this.mathMethods();
  }

  mathMethods() {
    let current: number = this.valmin;
    let max: number = this.valmax;
    let itera: number = this.valitera;
    let dx: number = (max - current) / itera;

    let id = 0;
    let result = 0;
    let error = 0;
    let iterations = [];

    if (itera < 1) {
      console.warn("Cantidad de Iteraciones no Válida: " + itera);
      return;
    }

    while (current < max) {
      id++;
      let fxi = this.evaluar(current);
      let fxii = this.evaluar(current + dx);
      let ai = ((fxi + fxii) / 2) * dx;
      result += ai;

      if (Number(this.resultintegral) <= result) {
        console.log(result);
        break;
      }

      iterations.push({
        id,
        xi: current.toFixed(12),
        fxi: fxi.toFixed(12),
        fxii: fxii.toFixed(12),
        ai: (ai).toFixed(12)
      });
      current += dx;
    }
    iterations.push({
      id: "",
      xi: "",
      fxi: "",
      fxii: "",
      ai: "S= " + (result).toFixed(9)
    });
    this.dataSource = iterations;

    error = (Math.abs(Number(this.resultintegral) - result)) / Number(this.resultintegral);
    console.log("ERROR REAL TRAPECIO: " + error.toExponential(5));
    console.log("%ERROR REAL TRAPECIO: " + (error * 100).toFixed(2) + "%");
    this.errortrapecio.emit({ method: 'Trapecio', ER: error.toExponential(5), PER: (error * 100).toFixed(2)});
    //console.log("iterations", iterations);
  }

  /* Evaluar en la formula sin integrar */
  evaluar(value: number) {

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
    let eval2 = node.eval({ x: value })
    //2(-2.8)+3(-2.8)^2
    //let val = ((simplify(evl).toin / (10 ** 4))*(10 ** 4));
    //funcion simplify de mathjs para evaluar la funcion en string.
    return Number(eval2);
  }

}
