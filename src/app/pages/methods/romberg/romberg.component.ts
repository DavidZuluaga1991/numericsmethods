import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { parse, simplify } from 'mathjs';

@Component({
  selector: 'app-romberg',
  templateUrl: './romberg.component.html',
  styleUrls: ['./romberg.component.css']
})
export class RombergComponent implements OnInit {

  @Input() public valmin: number = 0;
  @Input() public valmax: number = 0;
  @Input() public valitera: number = 0;
  @Input() public valeval: string = "";
  @Input() public resultintegral: number = 0;
  @Output() public errorromberg = new EventEmitter();
  displayedColumns: string[] = ['ai'];

  dataSource = [];
  constructor() {

  }
  ngOnInit() {
    this.mathMethods();
  }

  mathMethods() {
    let current: number = this.valmin;
    let max: number = this.valmax;
    let itera: number = (this.valitera % 2 == 0 ? this.valitera : this.valitera + 1);

    if (itera < 2) {
      console.warn("Cantidad de Iteraciones no Válida: " + itera);
      return;
    }

    if (itera % 2 != 0) {
      console.warn("Cantidad de Iteraciones debe ser par: " + itera);
      return;
    }

    let r = [];
    for (let i = 0; i <= 3; i++) {
      r[i] = [];
      for (var j: number = 0; j <= 3; j++) {
        r[i][j] = 0;
      }
    }

    let i = 0;
    let h: number = max - current;
    let f0 = this.evaluar(this.valmin);
    let fn = this.evaluar(this.valmax);
    let x = this.valmax;
    let k = 1;
    let tol = 0.000001;

    r[1][1] = (h / 2) * (f0 + fn);
    let iterations = [];

    while (1) {
      i++;
      h /= 2;
      let s = 0;

      for (var p = 1; p <= k; p++) {
        x = this.valmin + h * (2 * p - 1);
        let g = this.evaluar(x);
        s = s + g;
      }
      r[i + 1][1] = (1 / 2) * (r[i][1]) + h * s;
      k = 2 * k;
      for (var m = 1; m < i; m++) {
        r[i + 1][m + 1] = r[i + 1][m] + (r[i + 1][m] - r[i][m]) / (Math.pow(4, m - 1));
      }
      p = Math.abs((r[i + 1][m + 1]) - r[i][i]);
      if (p <= tol) {
        console.log(r);
        break;
      } else {
        p > tol;
      }
    }

    let r1 = r[3][1];
    let r2 = r[3][2];

    let result = Math.abs(this.resultintegral - r1) > Math.abs(this.resultintegral - r2) ? r2 : r1;
    let error = (Math.abs(Number(this.resultintegral) - result)) / Number(this.resultintegral);
    this.errorromberg.emit({ method: 'Romberg', ER: error.toExponential(5), PER: (error * 100).toFixed(2) });

    iterations.push({
      ai: result.toFixed(10)
    });
    this.dataSource = iterations;
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
