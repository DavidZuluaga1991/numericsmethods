import { Component, OnInit, Input } from '@angular/core';
import { parse,simplify } from "mathjs";

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  @Input() public eval: string= "";

  chartOptions = {
    responsive: true
  };

  chartData: any[] = [];
  myColors = [
    {
      backgroundColor: "rgba(103, 58, 183, .1)",
      borderColor: "rgb(103, 58, 183)",
      pointBackgroundColor: "rgb(103, 58, 183)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(103, 58, 183, .8)"
    }
    // ...colors for additional data sets
  ];
  chartLabels: string[] = [];// = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5"];
  
  constructor() { }

  ngOnInit() {
    this.graphe();
  }
  
  private graphe() {
    let datas: number[] = [];
    for (let i = -50; i <= 50; ) {
      datas.push(this.evaluar(i/10));
      i+=2;
    }
    this.chartData.push({
      data: datas,
      label: "Grafica Integral" /*, yAxisID: 'left-y-axis'*/
    });
  }

  evaluar(value: number) {
    //Variable que se utiliza como temporal mientras se recorre el metodo.
    let evl = "";
    //Ciclo para recorrer el string o valor de la funcion para wolfram
    /*for (let i = 0; i < this.eval.length; i++) {
      //Condicion para encontrar la variable (x) y reemplazarla por value
      if (this.eval.charAt(i) == "x") {
        evl += "(" + value + ")";
      } else {
        evl += this.eval.charAt(i);
      }
    }*/
    let p = this.eval.split("sin");
    let node = parse(this.eval); 
    let eval2 = node.eval({x: value})   
    this.chartLabels.push(value.toString());
    //console.log(evl);
    console.log(`eval2 = ${eval2}`);
    //console.log(simplify(evl));
    //funcion simplify de mathjs para evaluar la funcion en string.
    return Number(eval2);
  }
  onChartClick(event) {
    console.log(event);
  }
}
