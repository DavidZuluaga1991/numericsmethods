import { Component, OnInit, Input } from '@angular/core';
import { parse } from "mathjs";

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  @Input() public eval: string= "";
  @Input() public resultintegral: string= "";
  fromNum: number = -50;
  toNum: number = 50;
  value: number = 20;
  ope: boolean = true;

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
    },
    {
      backgroundColor: "rgba(221, 21, 21, 0.1)",
      borderColor: "rgb(247, 52, 52)",
      pointBackgroundColor: "rgb(247, 52, 52)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(103, 58, 183, .8)"
    }
    // ...colors for additional data sets
  ];
  chartLabels: string[] = [];// = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5"];
  
  constructor() { }

  ngOnInit() {
    this.formto(10);
    this.graphe();
  }
  
  private graphe() {
    let datas: number[] = [];
    let datas2: number[] = [];
    let result= Number(this.resultintegral);
    let j = 10;
    if(result < 0){
      j = ((result - this.fromNum) < 20) ? ((result - this.fromNum) < 10) ? 5 : 4 : 1;
    }
    else{
      j = ((result - this.toNum) > -35) ? ((result - this.toNum) > -10) ? 5 : 4 : 1;
    }
    console.log(j);
    for (let i = this.fromNum; i <= this.toNum; ) {
      let ev = this.evaluar(i/10);
      datas.push(ev);
      if( (i/10) >= (result-0.1) && (i/10) <= (result+0.1))
      {
        datas2.push(ev);
      }
      else{
        datas2.push(0);
      }
      i+=(2/j);
    }
    this.chartData.push({
      data: datas,
      label: "Grafica Integral" /*, yAxisID: 'left-y-axis'*/
    },
    {
      data: datas2,
      label: "Grafica Punto Integral" /*, yAxisID: 'left-y-axis'*/
    });
  }

  evaluar(value: number) {
    let node = parse(this.eval); 
    let eval2 = node.eval({x: value})   
    this.chartLabels.push(value.toFixed(2).toString());
    //funcion simplify de mathjs para evaluar la funcion en string.
    return Number(eval2);
  }
  onChartClick(event) {
    console.log(event);
  }
  //Se evalua como va a 
  formto(p : number){
    let prox = (Number(this.resultintegral)  * p);
    if(Number(this.resultintegral) < 0){
      this.fromNum = prox - this.value;
      this.toNum = prox + this.value;
    }
    else{
      this.fromNum = prox - this.value;
      this.toNum = prox + this.value;
    }
  }
  operation(op: string){
    
    if(op === "+")
    {
      this.fromNum += 2;
      this.toNum -= 2;
    }
    else{
      this.fromNum -= 2;
      this.toNum += 2;
    }
    this.chartData = [];
    this.chartLabels = [];
    this.ope = false;
    setTimeout(() => {
      this.graphe();
      this.ope = true;
    }, 10);
  }
}
