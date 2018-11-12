import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { button } from './models/buttons';
import { derivative, simplify } from 'mathjs';
import { AppServiceService } from './../services/app-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firebases } from './models/firebase';
import { ModalComponent } from '../methods/modal/modal.component';

@Component({
  selector: 'app-integral',
  templateUrl: './integral.component.html',
  styleUrls: ['./integral.component.css'],
  providers: [AppServiceService]
})
export class IntegralComponent implements OnInit {
  //Variable para la carga de datos
  load: boolean = false;

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
  private metodosArray: string[] = ["rieman", "simpson", "trapecio", "romberg"]

  //Array para obtener todos los numeros.
  private buttons: button[] = [
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
    new button("="),
  ];
  // Array para obtener los Botones diferentes a los numericos.
  private buttonsSpecial: button[] = [
    new button("+", "--"),
    new button("-"),
    new button("*"),
    new button("/", undefined, "\\frac{a}{b}"),
    new button("x"),
    new button("x^", "^"),
    new button("∫", "Integrate[", "\\int{}"),
    new button("f(x)", undefined, "\\f{x}"),
  ];

  constructor(private service: AppServiceService, private modalService: NgbModal) {
  }

  ngOnInit() {
    //console.log(Math.integral('x^2', 'x'));
  }
  format(num: number) {
    return Number((num / 10000).toFixed(1))
  }

  
  //Evento para obtener el recultado de la Variable
  resultEvent() {
    //this.wolframalpha = 'Integrate[((2x^2/5))--1,x]';
    //this.valuemin = Number((this.valuemin / 10000).toFixed(1));
    //this.valuemax = Number((this.valuemax / 10000).toFixed(1));
    //Se iguala el valor a la operacion dada despues de la integral. 
    this.eval = this.wolframalpha.split("Integrate[")[1];
    //Condicion para saber si va a realizar el proceso al api o no, siempre y cuando se haya agregado la integral 
    if (this.integralWolframalpha) {
      //Se arma la integral completa para enviar a wolfram 'Integrate[((2x^2/5))--1,x]'
      this.wolframalpha = (this.integralWolframalpha ? `${this.wolframalpha},{x,${(this.format(this.valuemin))},${this.format(this.valuemax)}}]` : '');
      //Se realiza el proceso para enviarla a la api de wolfram
      this.result();
      //this.mathMethods();
    } else {
      //Si no se realiza la integral tiene encuenta los metodos de mathjs
      this.resultintegral = simplify(this.wolframalpha).toString();
      //Se obtiene el resultado de la operaciòn.
      this.equation += `= ${this.resultintegral}`;
    }
  }

  result() {
    //Se inicializa Variable para que aparezca el cargando.
    this.load = true;
    //Se llama el servicio el cual se consulta a las api
    this.service.searchValue(this.wolframalpha)
      .subscribe(data => {
        //con lo que retorna el api se llenan las variables imgformula, imggrafica,resultintegral
        this.imgformula = data['queryresult']['pods'][0]['subpods'][0]['img']['src'];
        this.imggrafica = data['queryresult']['pods'][1]['subpods'][0]['img']['src'];
        this.resultintegral = data['queryresult']['pods'][0]['subpods'][0]['plaintext'];
        //Se usan varios split para poder sacar el valor resultante que nos interesa
        this.resultintegral = this.resultintegral.split('=')[(this.resultintegral.split('=').length > 1 ? 1 : 0)].split("+ constant")[0].trim();

        this.equation += `= `;
        let parentesis: boolean = false;
        let res: string = '';

        //Se hace este recorrido para poder obtener mejor el valor, ya que cuando lo retorna el api este contiene espacios y se complica al leerlo la libreria katex
        for (let l = 0; l < this.resultintegral.length; l++) {
          let chart: string = this.resultintegral.charAt(l);
          if (chart == '(') {
            parentesis = true;
            res += chart;
          }
          if (!(parentesis && chart == ' ') && !(chart == ')') && !(chart == '(')) {
            res += chart;
          }
          if (chart == ')') {
            parentesis = false;
            res += chart;
          }
        }
        //Con lo recorrido anteriormente se igual el resultado de esta operacion con resultintegral
        this.resultintegral = res;

        this.resultintegral.split(' ').forEach(i => {
          let div: boolean = false;
          //Ciclo para saber si dentro del resultado o string hay una division.
          for (let j = 0; j < i.length; j++) {
            if (i.charAt(j) == '/') {
              div = true;
            }
          }
          if (div) {
            this.equation += `\\frac{${i.split('/')[0]}}{${i.split('/')[1]}}`;
          }
          else
            this.equation += i;
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
      });
  }

  /** Funcion el cual se ejecuta al hacer el evento en el boton**/
  formula(e: button) {
    if (e.name === "x^") {
      this.elevado = true;
    }
    else {
      this.equation = (this.equation == undefined ? '' : this.equation) + (this.elevado ? "^" : "") + (e.name == "∫" ? e.katex : e.name);

      if (!(e.name == "f(x)" || e.name == "=")) {
        let pru = e.name;
        if (e.name == "∫") {
          pru = e.wolframalpha;
          this.integralWolframalpha = true;
        }
        this.wolframalpha = (this.wolframalpha == undefined ? '' : this.wolframalpha) + (this.elevado ? "^" : "") + pru;
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
    const dialogRef = this.modalService.open(ModalComponent, { size: 'lg' });
    dialogRef.componentInstance.eval = this.eval;
    dialogRef.componentInstance.valuemin = this.format(this.valuemin);
    dialogRef.componentInstance.valuemax = this.format(this.valuemax);
    dialogRef.componentInstance.valueitera = this.format(this.valueitera);
    dialogRef.componentInstance.method = methods;
    dialogRef.result.then((result) => {
      console.log('ingreso ' + methods);
    }, (reason) => {
      console.log('Salio de ' + methods);
    });
  }
  //Funcion que realiza los valores del slider
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return (value / 10000).toFixed(1);
    }

    this.valuemin = value;
    return value;
  }
}

