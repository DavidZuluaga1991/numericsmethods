import { Component, OnInit, ViewChild } from "@angular/core";
import { KatexOptions } from "ng-katex";
import { button } from "./models/buttons";
import { parse,derivative, simplify } from "mathjs";
import { AppServiceService } from "./../../services/app-service.service";
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
  algebraicfunction: boolean = false;
  metodosResult = {};

  //Variable para Katex
  equation: string = "";
  //Valores para el silder
  valuemin: number = 0;
  valuemax: number = 0;
  valueitera: number = 0;
  //Variables para el api de wolfram
  wolframalpha: string;
  integralWolframalpha: boolean = false;
  //Variables para las respuestas del Wolfram
  //imgformula: string;
  //imggrafica: string;
  resultintegral: string;
  //Variables de ayuda
  elevado: boolean = false;
  eval: string;
  //Variable para saber si usaron la x o no
  usex: boolean = true;
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
    new button("0"),
    new button("1"),
    new button("2"),
    new button("3"),
    new button("4"),
    new button("5"),
    new button("6"),
    new button("7"),
    new button("8"),
    new button("9"),
  ];
  // Array para obtener los Botones diferentes a los numericos.
  buttonsSpecial: button[] = [
    new button("π"),
  new button("e"),
  new button("+", "--"),
  new button("-"),
  new button("*"),
  new button("/", undefined, "\\frac{a}{b}"),
  new button("(",undefined, "\\lparen "),
  new button(")",undefined, "\\rparen "),
  new button("x^", "^"),
  new button("log",undefined, "\\log "),
  new button("sin",undefined, "\\sin "),
  new button("cos",undefined, "\\cos "),
  new button("sec",undefined, "\\sec "),
  new button("tan",undefined, "\\tan "),
  new button("."),
  new button("∫", "Integrate[", "\\int{}"),
  new button("x"),
  new button("f(x)", undefined, "\\f{x}"),
  new button("="),
  ];  

  @ViewChild(RiemanComponent) rieman: RiemanComponent;
  @ViewChild(RombergComponent) romberg: RombergComponent;
  @ViewChild(SimpsonComponent) simpson: SimpsonComponent;
  @ViewChild(TrapecioComponent) trapecio: TrapecioComponent;

  constructor(
    private service: AppServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    //console.log(Math.integral('x^2', 'x'));
    /*console.log(simplify('sin(-5)^3'));
    console.log(simplify('2(-5)+3(-5)^2+sin(-5)').toString());*/
    let node = parse('x^pi'); 
    let eval2 = node.eval({x: 2}); 
    console.log(eval2);
    //console.log(simplify('integrate(f(x), x, 0, 2)'));
    //simplify('integrate(x^0.5, x, 0, 1)');
  }

  //Evento para obtener el recultado de la Variable
  resultEvent() {
    //Se iguala el valor a la operacion dada despues de la integral.
    let ev = this.wolframalpha.split("Integrate[")[1];
    this.eval = "";
    for (let l = 0; l < ev.length; l++) {
      if(ev.charAt(l) == 'π'){
         this.eval += 'pi'
      }
      else{
        this.eval += ev.charAt(l);
      }
    }
    //Condicion para saber si va a realizar el proceso al api o no, siempre y cuando se haya agregado la integral
    if (this.integralWolframalpha) {
      //Se arma la integral completa para enviar a wolfram 'Integrate[((2x^2/5))--1,x]'
      this.wolframalpha = this.integralWolframalpha
        ? `${this.wolframalpha},{x,${this.valuemin},${this.valuemax}}]`
        : "";
      //Se realiza el proceso para enviarla a la api de wolfram
      this.result();
    } else {
      //Si no se realiza la integral tiene encuenta los metodos de mathjs
      this.resultintegral = simplify(this.wolframalpha).toString();
      //Se obtiene el resultado de la operaciòn.
      this.equation += `= ${this.resultintegral}`;
    }
  }

  //http://api.wolframalpha.com/v2/query?appid=Y28G28-V7Y7YQU724&input=Integrate[x^2 sin^3 x,{x,0,0}]&output=json
  result() {
    //Se inicializa Variable para que aparezca el cargando.
    this.load = true;
    //Se llama el servicio el cual se consulta a las api
    this.service
      .searchValue(this.wolframalpha /*'Integrate[x^2 sin^3 x,{x,-1.8,3}]'*/)
      .subscribe(data => {
        let pods = data["queryresult"]["pods"];
        for (let f = 0; f < pods.length; f++) {
          //const element = pods[f];
          if (pods[f]["title"] == "Definite integral") {
            this.resultintegral = pods[f]["subpods"][0]["plaintext"];
          }
        }
        //con lo que retorna el api se llenan las variables imgformula, imggrafica,resultintegral
        /*this.imgformula =
        data["queryresult"]["pods"][0]["subpods"][0]["img"]["src"];
      this.imggrafica =
        data["queryresult"]["pods"][1]["subpods"][0]["img"]["src"];*/

        //Se usan varios split para poder sacar el valor resultante que nos interesa
        this.resultintegral = this.resultintegral
          .split("=")
          [this.resultintegral.split("=").length > 1 ? 1 : 0].split(
            "+ constant"
          )[0]
          .trim();
        if(this.resultintegral.split("≈").length > 1){
          this.resultintegral = this.resultintegral.split("≈")[1];
        }
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
        this.usex = true;
        //Se inicializa un metodo para poder realizar el post a firebase
        let fire = new firebases();
        fire.equation = this.equation;
        fire.wolframalpha = this.wolframalpha;
        /*fire.imgformula = this.imgformula;
      fire.imggrafica = this.imggrafica;*/
        fire.resultintegral = this.resultintegral;
        fire.createdate = new Date().toString();
        fire.valuemin = this.valuemin;
        fire.valuemax = this.valuemax;
        fire.valueitera = this.valueitera;
        fire.eval = this.eval;
        this.service.postHistory(fire);
        this.functionDisabled(false,true);
      });
  }

  /** Funcion el cual se ejecuta al hacer el evento en el boton**/
  formula(e: button) {
    if(e.name === "x"){
      this.usex = false;
    }
    if (e.name === "x^") {
      this.elevado = true;
      this.functionDisabled(false);
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
          (pru === "+" ? e.wolframalpha : pru);
        this.elevado = false;
      }
      if(e.name === "log" || e.name === "sin" || e.name === "cos" || e.name === "tan" || e.name === "sec"){
        this.functionDisabled(false);
      }
      else{
        this.functionDisabled(true);
      }
    }
  }
  /**
   * Funcion para limpiar todo y volver a realizar.
   */
  cleanOperation() {
    this.equation = undefined;
    this.wolframalpha = undefined;
    /*this.imgformula = undefined;
    this.imggrafica = undefined;*/
    this.resultintegral = undefined;
    this.integralWolframalpha = false;
    this.elevado = false;
    this.valuemax = 0;
    this.valuemin = 0;
    this.valueitera = 0;
    this.usex = true;
    this.functionDisabled(true);
  }

  //Metodo o funcion para poder sacar las modales de cada metodo
  metod(methods: string) {
    const dialogRef = this.modalService.open(ModalComponent, { size: "lg" });
    dialogRef.componentInstance.eval = this.eval;
    dialogRef.componentInstance.valuemin = this.valuemin;
    dialogRef.componentInstance.valuemax = this.valuemax;
    dialogRef.componentInstance.valueitera = this.valueitera;
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

  functionDisabled(disabled: boolean,val?: boolean) {
    //let disabled = true;
    if(!disabled){
      this.buttons.forEach(i => {
        if(i.name === "="  || val){
          i.budisabled = true;
        }
      });
      
      this.buttonsSpecial.forEach(i => {
        if(!(i.name === "(" || i.name === "π") || val)
        {
          i.budisabled  = true;
        }
      });
    }
    else{
      this.buttons.forEach(i => {
          i.budisabled = false;
      });
      
      this.buttonsSpecial.forEach(i => {
          i.budisabled  = false;
      });
    }

  }
}
