import { Component, OnInit, Input } from '@angular/core';
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
  displayedColumns: string[] = ['id', 'xi', 'fxi', 'ai'];

  dataSource = [];
  constructor() {

  }
  ngOnInit() {
    this.mathMethods();
  }

  mathMethods() {
    let current: number = this.valmin;
    let max: number = this.valmax;
    let itera: number = this.valitera;

    if (itera < 2) {
      console.warn("Cantidad de Iteraciones no Válida: " + itera);
      return;
    }

    if (itera % 2 != 0) {
      console.warn("Cantidad de Iteraciones debe ser par: " + itera);
      return;
    }

    let r = [];
    for (let i = 0; i <= this.valitera; i++) {
      r[i] = [];
      for (var j: number = 0; j <= this.valitera; j++) {
        r[i][j] = 0;
      }
    }

    let i = 0;
    let h: number = max - current;
    let f0 = this.evaluar(this.valmin);
    let fn = this.evaluar(this.valmax);
    let x = this.valmax;
    let k = 1;
    let tol = 0.00000004;

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

    /*for (let i = 2; i <= this.valitera; i++) {
      r[2][1] = 0.5 + (r[1][1] + this.sum(this.valmin, i, h));
      console.log("r[2][1]" + r[2][1]);
      for (let j = 2; j <= i; j++) {
        r[2][j] = r[2][j - 1] + (r[2][j - 1] - r[1][j - 1]) / (Math.pow(4, j - 1) - 1);
        console.log("r[2][j]" + r[2][j]);
      }
      h = h / 2;
      for (let j = 1; j <= i; j++) {
        r[1][j] = r[2][j];
      }
    }*/


    iterations.push({
      id: "",
      xi: "",
      fxi: "",
      ai: "0"
    });
    this.dataSource = iterations;
    //console.log("iterations", iterations);
  }

  sum(value: number, n: number, h: number) {
    let node = parse(this.valeval);

    let result: number = 0;
    for (let i = 1; i <= Math.pow(2, n - 2); i++) {
      result += node.eval({ x: (value + (i - 0.5) * h) });
    }
    return result * h;
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
