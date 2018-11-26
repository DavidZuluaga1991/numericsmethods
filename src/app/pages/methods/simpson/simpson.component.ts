import { Component, OnInit, Input } from '@angular/core';
import { parse, simplify } from 'mathjs';

@Component({
  selector: 'app-simpson',
  templateUrl: './simpson.component.html',
  styleUrls: ['./simpson.component.css']
})
export class SimpsonComponent implements OnInit {

  @Input() public valmin: number = 0;
  @Input() public valmax: number = 0;
  @Input() public valitera: number = 0;
  @Input() public valeval: string = "";
  @Input() public resultintegral: number = 0;
  displayedColumns: string[] = ['id', 'xi', 'fxi', 'fxii', 'fxiii', 'ai'];

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
    let dx: number = (max - current) / itera;

    let id = 0;
    let result = 0;
    let iterations = [];
    while (current < max) {
      id++;
      let fxi = this.evaluar(current);
      let fxii = this.evaluar(current + dx);
      let fxiii = this.evaluar(current + (dx * 2));
      let ai = ((fxi + 4 * (fxii) + fxiii) / 3) * dx;

      result += (id % 2 == 0 ? 0 : ai);
      if (Number(this.resultintegral) <= result) {
        console.log(result);
        break;
      }

      iterations.push({
        id,
        xi: current.toFixed(10),
        fxi: fxi.toFixed(10),
        fxii: fxii.toFixed(10),
        fxiii: fxiii.toFixed(10),
        ai: (ai).toFixed(10)
      });

      current += dx;
    }
    iterations.push({
      id: "",
      xi: "",
      fxi: "",
      ai: "S= " + (result).toFixed(7)
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
