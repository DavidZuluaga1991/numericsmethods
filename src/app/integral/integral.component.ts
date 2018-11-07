import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { button } from './models/buttons';
import { derivative } from 'mathjs';
import { AppServiceService } from './../services/app-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RiemanComponent } from '../methods/rieman/rieman.component';
import { TrapecioComponent } from '../methods/trapecio/trapecio.component';
import { SimpsonComponent } from '../methods/simpson/simpson.component';
import { RombergComponent } from '../methods/romberg/romberg.component';
import { NgxXml2jsonService } from 'ngx-xml2json'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-integral',
  templateUrl: './integral.component.html',
  styleUrls: ['./integral.component.css'],
  providers: [AppServiceService]
})
export class IntegralComponent implements OnInit {

  equation: string = '';//'c = \\pm\\sqrt{a^2 + b^2}';//'\\sqrt{a^2 + b^2}';//'\\f{x} = \\int{x^2}';
  options: KatexOptions = {
    displayMode: true,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: { "\\f": "f(#1)" }
  };
  //private layout: any = 'alphanumeric';
  private buttons: button[] = [
    new button("1", ""),
    new button("2", ""),
    new button("3", ""),
    new button("4", ""),
    new button("5", ""),
    new button("6", ""),
    new button("7", ""),
    new button("8", ""),
    new button("9", ""),
    new button("0", ""),
    new button("=", ""),
  ];

  private buttonsSpecial: button[] = [
    new button("+", "+"),
    new button("-", "-"),
    new button("*", "*"),
    new button("/", "\\frac{a}{b}"),
    new button("∫", "\\int{}"),
    new button("f(x)", "\\f{x}"),
  ];

  constructor(private service: AppServiceService, private modalService: NgbModal,private ngxXml2jsonService: NgxXml2jsonService) {
    var d = derivative('x^2+x', 'x');
    console.log(d.toString());
    this.result('Integrate[x^2,x]');
  }

  ngOnInit() {
    //console.log(Math.integral('x^2', 'x'));
  }

  result(formula: string) {
    var p = this.service.searchValue(formula);
    
      /*p.subscribe((data:string) => {
        var a = this.ngxXml2jsonService.xmlToJson(data);
        console.log(a);
      });*/
  }

  formula(e: string) {
    this.equation = this.equation + e;
  }
  cleanOperation() {
    this.equation = "";
  }
  metod(metodos: string) {
    const dialogRef = this.modalService.open((metodos == "rieman" ? RiemanComponent : (metodos == "simpson" ? SimpsonComponent : (metodos == "trapecio" ? TrapecioComponent : RombergComponent))), { size: 'lg' });
    dialogRef.result.then((result) => {
      //this.refreshTable();
      //this.loadData();
      console.log('ingreso ' + metodos);
    }, (reason) => {
      //this.refreshTable();
      //this.loadData();
      console.log('Salio de ' + metodos);
    });
  }
}

