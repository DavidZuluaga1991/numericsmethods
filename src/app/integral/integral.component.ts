import { Component, OnInit, ViewChild } from "@angular/core";
import { KatexOptions } from "ng-katex";
import { button } from "./models/buttons";
import { derivative, simplify } from "mathjs";
import { AppServiceService } from "./../services/app-service.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { firebases } from "./models/firebase";
import { ModalComponent } from "../methods/modal/modal.component";
import { RiemanComponent } from "../methods/rieman/rieman.component";
import { RombergComponent } from "../methods/romberg/romberg.component";
import { SimpsonComponent } from "../methods/simpson/simpson.component";
import { TrapecioComponent } from "../methods/trapecio/trapecio.component";

@Component({
  selector: "app-integral",
  templateUrl: "./integral.component.html",
  styleUrls: ["./integral.component.css"],
  providers: [AppServiceService]
})
export class IntegralComponent implements OnInit {
  //Variable para la carga de datos
  load: boolean = false;
  metodosResult = {};

  //Variable para Katex
  equation: string;
  //Valores para el silder
  valuemin: number = 0;
  valuemax: number = 0;
  valueitera: number = 0;
  //Variables para el api de wolfram
  wolframalpha: string;
  integralWolframalpha: boolean = false;
  //Variables para las respuestas del Wolfram
  imgformula: string;
  imggrafica: string;
  resultintegral: string;
  //Variables de ayuda
  elevado: boolean = false;
  eval: string;

  //Valores que lleva el Katex
  options: KatexOptions = {
    displayMode: true,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: { "\\f": "f(#1)" }
  };

  //Array para los diferentes metodos.
  metodosArray: string[] = ["rieman", "simpson", "trapecio", "romberg"];

  //Array para obtener todos los numeros.
  buttons: button[] = [
    new button("1"),
    new button("2"),
    new button("3"),
    new button("4"),
    new button("5"),
    new button("6"),
    new button("7"),
    new button("8"),
    new button("9"),
    new button("0"),
    new button("=")
  ];
  // Array para obtener los Botones diferentes a los numericos.
  buttonsSpecial: button[] = [
    new button("+", "--"),
    new button("-"),
    new button("*"),
    new button("/", undefined, "\\frac{a}{b}"),
    new button("x"),
    new button("x^", "^"),
    new button("∫", "Integrate[", "\\int{}"),
    new button("f(x)", undefined, "\\f{x}")
  ];
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
  chartLabels = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5"];

  onChartClick(event) {
    console.log(event);
  }
  @ViewChild(RiemanComponent) rieman: RiemanComponent;
  @ViewChild(RombergComponent) romberg: RombergComponent;
  @ViewChild(SimpsonComponent) simpson: SimpsonComponent;
  @ViewChild(TrapecioComponent) trapecio: TrapecioComponent;
  
  evaluar(value: number) {
    //Variable que se utiliza como temporal mientras se recorre el metodo.
    let evl = "";
    //Ciclo para recorrer el string o valor de la funcion para wolfram
    for (let i = 0; i < this.eval.length; i++) {
      //Condicion para encontrar la variable (x) y reemplazarla por value
      if (this.eval.charAt(i) == "x") {
        evl += "(" + value + ")";
      } else {
        evl += this.eval.charAt(i);
      }
    }
    //funcion simplify de mathjs para evaluar la funcion en string.
    return Number(simplify(evl));
  }

  private graphe() {
    let datas: number[] = [];
    for (let i = -5; i <= 5; i++) {
      datas.push(this.evaluar(i));
    }
    this.chartData.push({
      data: datas,
      label: "Grafica Integral" /*, yAxisID: 'left-y-axis'*/
    });
  }
  constructor(
    private service: AppServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    //console.log(Math.integral('x^2', 'x'));
  }
  format(num: number) {
    return Number((num / 10000).toFixed(1));
  }

  //Evento para obtener el recultado de la Variable
  resultEvent() {
    //Se iguala el valor a la operacion dada despues de la integral.
    this.eval = this.wolframalpha.split("Integrate[")[1];
    //Condicion para saber si va a realizar el proceso al api o no, siempre y cuando se haya agregado la integral
    if (this.integralWolframalpha) {
      //Se arma la integral completa para enviar a wolfram 'Integrate[((2x^2/5))--1,x]'
      this.wolframalpha = this.integralWolframalpha
        ? `${this.wolframalpha},{x,${this.format(this.valuemin)},${this.format(
            this.valuemax
          )}}]`
        : "";
      //Se realiza el proceso para enviarla a la api de wolfram
      this.result();
    } else {
      //Si no se realiza la integral tiene encuenta los metodos de mathjs
      this.resultintegral = simplify(this.wolframalpha).toString();
      //Se obtiene el resultado de la operaciòn.
      this.equation += `= ${this.resultintegral}`;

      this.mathMethods();
    }
  }

  mathMethods() {
    let current = Number((this.valuemin / 10000).toFixed(1));
    let max = Number((this.valuemax / 10000).toFixed(1));
    let itera = Number((this.valueitera / 10000).toFixed(1));

    this.metodosResult = {
      riemannMethod: this.riemannMethod(current, max, itera),
      trapecioMethod: this.trapecioMethod(current, max, itera),
      simpsonMethod: this.simpsonMethod(current, max, itera),
      rambergMethod: this.rambergMethod(current, max, itera)
    };
    console.log("this.metodosResult", this.metodosResult);
  }

  trapecioMethod(current, max, itera) {
    let sum = 0;
    let ea = 0;
    let iterations = [];

    return {
      resultintegral: this.resultintegral,
      sum,
      ea,
      er: ea / parseFloat(this.resultintegral),
      iterations: iterations
    };
  }

  simpsonMethod(current, max, itera) {
    let sum = 0;
    let ea = 0;
    let iterations = [];

    return {
      resultintegral: this.resultintegral,
      sum,
      ea,
      er: ea / parseFloat(this.resultintegral),
      iterations: iterations
    };
  }

  rambergMethod(current, max, itera) {
    let sum = 0;
    let ea = 0;
    let iterations = [];

    return {
      resultintegral: this.resultintegral,
      sum,
      ea,
      er: ea / parseFloat(this.resultintegral),
      iterations: iterations
    };
  }

  riemannMethod(current, max, itera) {
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
        xi: current.toFixed(9),
        fxi: evl.toFixed(9),
        ai: (evl * itera).toFixed(9)
      });
      current += itera;
    }
    let sum = iterations.reduce(
      (prev, current) =>
        prev + (isNaN(parseFloat(current.ai)) ? 0 : parseFloat(current.ai)),
      0
    );
    let ea = parseFloat((parseFloat(this.resultintegral) - sum).toFixed(9));

    return {
      resultintegral: this.resultintegral,
      sum,
      ea,
      er: ea / parseFloat(this.resultintegral),
      iterations: iterations
    };
  }

  result() {
    //Se inicializa Variable para que aparezca el cargando.
    this.load = true;
    //Se llama el servicio el cual se consulta a las api
    this.service.searchValue(this.wolframalpha).subscribe(data => {
      //con lo que retorna el api se llenan las variables imgformula, imggrafica,resultintegral
      this.imgformula =
        data["queryresult"]["pods"][0]["subpods"][0]["img"]["src"];
      this.imggrafica =
        data["queryresult"]["pods"][1]["subpods"][0]["img"]["src"];
      this.resultintegral =
        data["queryresult"]["pods"][0]["subpods"][0]["plaintext"];
      //Se usan varios split para poder sacar el valor resultante que nos interesa
      this.resultintegral = this.resultintegral
        .split("=")
        [this.resultintegral.split("=").length > 1 ? 1 : 0].split(
          "+ constant"
        )[0]
        .trim();

      this.equation += `= `;
      let parentesis: boolean = false;
      let res: string = "";

      //Se hace este recorrido para poder obtener mejor el valor, ya que cuando lo retorna el api este contiene espacios y se complica al leerlo la libreria katex
      for (let l = 0; l < this.resultintegral.length; l++) {
        let chart: string = this.resultintegral.charAt(l);
        if (chart == "(") {
          parentesis = true;
          res += chart;
        }
        if (
          !(parentesis && chart == " ") &&
          !(chart == ")") &&
          !(chart == "(")
        ) {
          res += chart;
        }
        if (chart == ")") {
          parentesis = false;
          res += chart;
        }
      }
      //Con lo recorrido anteriormente se igual el resultado de esta operacion con resultintegral
      this.resultintegral = res;

      this.resultintegral.split(" ").forEach(i => {
        let div: boolean = false;
        //Ciclo para saber si dentro del resultado o string hay una division.
        for (let j = 0; j < i.length; j++) {
          if (i.charAt(j) == "/") {
            div = true;
          }
        }
        if (div) {
          this.equation += `\\frac{${i.split("/")[0]}}{${i.split("/")[1]}}`;
        } else this.equation += i;
        //console.log(i);
      });

      this.load = false;

      //Se inicializa un metodo para poder realizar el post a firebase
      let fire = new firebases();
      fire.equation = this.equation;
      fire.wolframalpha = this.wolframalpha;
      fire.imgformula = this.imgformula;
      fire.imggrafica = this.imggrafica;
      fire.resultintegral = this.resultintegral;
      fire.createdate = new Date().toString();
      fire.valuemin = this.format(this.valuemin);
      fire.valuemax = this.format(this.valuemax);
      fire.valueitera = this.format(this.valueitera);
      fire.eval = this.eval;
      this.service.postHistory(fire);
      this.graphe();
      this.mathMethods();
    });
  }

  /** Funcion el cual se ejecuta al hacer el evento en el boton**/
  formula(e: button) {
    if (e.name === "x^") {
      this.elevado = true;
    } else {
      this.equation =
        (this.equation == undefined ? "" : this.equation) +
        (this.elevado ? "^" : "") +
        (e.name == "∫" ? e.katex : e.name);

      if (!(e.name == "f(x)" || e.name == "=")) {
        let pru = e.name;
        if (e.name == "∫") {
          pru = e.wolframalpha;
          this.integralWolframalpha = true;
        }
        this.wolframalpha =
          (this.wolframalpha == undefined ? "" : this.wolframalpha) +
          (this.elevado ? "^" : "") +
          pru;
      }
    }
  }
  /**
   * Funcion para limpiar todo y volver a realizar.
   */
  cleanOperation() {
    this.equation = undefined;
    this.wolframalpha = undefined;
    this.imgformula = undefined;
    this.imggrafica = undefined;
    this.resultintegral = undefined;
    this.integralWolframalpha = false;
    this.elevado = false;
    this.valuemax = 0;
    this.valuemin = 0;
    this.valueitera = 0;
  }

  //Metodo o funcion para poder sacar las modales de cada metodo
  metod(methods: string) {
    const dialogRef = this.modalService.open(ModalComponent, { size: "lg" });
    dialogRef.componentInstance.eval = this.eval;
    dialogRef.componentInstance.valuemin = this.format(this.valuemin);
    dialogRef.componentInstance.valuemax = this.format(this.valuemax);
    dialogRef.componentInstance.valueitera = this.format(this.valueitera);
    dialogRef.componentInstance.method = methods;
    dialogRef.result.then(
      result => {
        console.log("ingreso " + methods);
      },
      reason => {
        console.log("Salio de " + methods);
      }
    );
  }
  //Funcion que realiza los valores del slider
  formatLabel(value: number | null) {
    if (!value) {
      let sum = 0;
      let ea = 0;
      let iterations = [];

      return {
        resultintegral: this.resultintegral,
        sum,
        ea,
        er: ea / parseFloat(this.resultintegral),
        iterations: iterations
      };
    }

    if (value >= 1000) {
      return (value / 10000).toFixed(1);
    }

    this.valuemin = value;
    return value;
  }
}
