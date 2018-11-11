import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { button } from './models/buttons';
import { derivative, simplify } from 'mathjs';
import { AppServiceService } from './../services/app-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RiemanComponent } from '../methods/rieman/rieman.component';
import { TrapecioComponent } from '../methods/trapecio/trapecio.component';
import { SimpsonComponent } from '../methods/simpson/simpson.component';
import { RombergComponent } from '../methods/romberg/romberg.component';
import { firebases } from './models/firebase';

@Component({
  selector: 'app-integral',
  templateUrl: './integral.component.html',
  styleUrls: ['./integral.component.css'],
  providers: [AppServiceService]
})
export class IntegralComponent implements OnInit {

  load: boolean = false;

  equation: string;
  valuemin: number = 0;
  valuemax: number = 0;
  valueitera: number = 0;

  wolframalpha: string;
  integralWolframalpha: boolean = false;

  imgformula: string;
  imggrafica: string;
  resultintegral: string;
  elevado: boolean = false;

  options: KatexOptions = {
    displayMode: true,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: { "\\f": "f(#1)" }
  };
  private metodosArray: string[] = ["rieman", "simpson", "trapecio", "romberg"]
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
  format(num: number){
    return Number((num / 10000).toFixed(1))
  }
  resultEvent() {
    //this.wolframalpha = 'Integrate[((2x^2/5))--1,x]';
    //this.valuemin = Number((this.valuemin / 10000).toFixed(1));
    //this.valuemax = Number((this.valuemax / 10000).toFixed(1));
    this.wolframalpha = (this.integralWolframalpha ? `${this.wolframalpha},{x,${((this.valuemin / 10000).toFixed(1))},${(this.valuemax / 10000).toFixed(1)}}]` : '');
    if (this.integralWolframalpha) {
      this.result();
    } else {
      this.resultintegral = simplify(this.wolframalpha).toString();
      this.equation += `= ${this.resultintegral}`;
    }
  }

  result() {
    this.load = true;
    this.service.searchValue(this.wolframalpha)
      .subscribe(data => {
        //var a = this.ngxXml2jsonService.xmlToJson(data);
        this.imgformula = data['queryresult']['pods'][0]['subpods'][0]['img']['src'];
        this.imggrafica = data['queryresult']['pods'][1]['subpods'][0]['img']['src'];
        this.resultintegral = data['queryresult']['pods'][0]['subpods'][0]['plaintext'];
        this.resultintegral = this.resultintegral.split('=')[(this.resultintegral.split('=').length > 1 ? 1 : 0)].split("+ constant")[0].trim();

        this.equation += `= `;
        let parentesis: boolean = false;
        let res: string = '';

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
        this.resultintegral = res;

        this.resultintegral.split(' ').forEach(i => {
          let div: boolean = false;
          //let count = 0;
          for (let j = 0; j < i.length; j++) {
            if (i.charAt(j) == '/') {
              div = true;
              //count++;
            }
          }
          if (div) {
            this.equation += `\\frac{${i.split('/')[0]}}{${i.split('/')[1]}}`;
          }
          else
            this.equation += i;
          console.log(i);
        });
        /*var d = derivative(this.resultintegral, 'x');
        console.log(d.toString());*/
        /*console.log(data);
        console.log(this.imgformula);
        console.log(this.imggrafica);*/
        //console.log(this.resultintegral);

        this.load = false;
        
        let fire = new firebases();
        fire.equation = this.equation;
        fire.wolframalpha = this.wolframalpha;
        fire.imgformula = this.imgformula;
        fire.imggrafica = this.imggrafica;
        fire.resultintegral = this.resultintegral;
        this.service.postHistory(fire);
      });
  }

  formula(e: button /*e: string,wol?: string,katex?: string*/) {
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

  cleanOperation() {
    this.equation = undefined;
    this.wolframalpha = undefined;
    this.imgformula = undefined;
    this.imggrafica = undefined;
    this.resultintegral = undefined;
    this.integralWolframalpha = false;
    this.elevado = false;
  }

  metod(metodos: string) {
    const dialogRef = this.modalService.open((metodos == "rieman" ? RiemanComponent : (metodos == "simpson" ? SimpsonComponent : (metodos == "trapecio" ? TrapecioComponent : RombergComponent))), { size: 'lg' });
    dialogRef.result.then((result) => {
      console.log('ingreso ' + metodos);
    }, (reason) => {
      console.log('Salio de ' + metodos);
    });
  }
  formatLabel(value: number | null) {
    if (!value) {
      //this.valuemin = "0";
      return 0;
    }

    if (value >= 1000) {
      //this.valuemin = Number((value / 10000).toFixed(1));
      //console.log(this.valuemin);
      return (value / 10000).toFixed(1);
    }

    this.valuemin = value;
    return value;
  }
}

