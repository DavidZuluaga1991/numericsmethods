import { Component, OnInit, ViewChild } from "@angular/core";
import { KatexOptions } from "ng-katex";
import { RiemanComponent } from "./../methods/rieman/rieman.component";
import { RombergComponent } from "../methods/romberg/romberg.component";
import { SimpsonComponent } from "../methods/simpson/simpson.component";
import { TrapecioComponent } from "../methods/trapecio/trapecio.component";
import { AppServiceService } from "src/app/services/app-service.service";
import { firebases } from "../integral/models/firebase";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  historysIntegral: firebases[];

  equation: string;
  valuemin: number = 0;
  valuemax: number = 0;
  valueitera: number = 0;
  eval: string;
  fi: firebases;

  pru: boolean = false;
  options: KatexOptions = {
    displayMode: true,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: { "\\f": "f(#1)" }
  };

  @ViewChild(RiemanComponent) rieman: RiemanComponent;
  @ViewChild(RombergComponent) romberg: RombergComponent;
  @ViewChild(SimpsonComponent) simpson: SimpsonComponent;
  @ViewChild(TrapecioComponent) trapecio: TrapecioComponent;

  constructor(private service: AppServiceService) {}

  ngOnInit() {
    this.service.getHistorys().subscribe((datas: firebases[]) => {
      let data: any;
      if (datas != undefined || datas != null) {
        data = datas.sort(function(a, b) {
          if (a.createdate > b.createdate) {
            return -1;
          }
          if (a.createdate < b.createdate) {
            return 1;
          }
          return 0;
        });

        data.forEach(j => {
          let equ: string = "";
          for (let i = 0; i < j.equation.length; i++) {
            if (j.equation.charAt(i) == "=") {
              equ += " \\scriptsize ";
            }
            equ += j.equation.charAt(i);
          }
          j.equation = equ;
        });
        this.historysIntegral = data;
        if (
          this.historysIntegral != undefined &&
          this.historysIntegral.length != 0
        ) {
          this.resultEvent(this.historysIntegral[0]);
        }
      }
    });
  }

  resultEvent(fire: firebases) {
    this.pru = false;
    this.clean();
    setTimeout(() => {
      this.fi = fire;
      this.equation = fire.equation;
      this.valuemin = fire.valuemin;
      this.valuemax = fire.valuemax;
      this.valueitera = fire.valueitera;
      this.eval = fire.eval;
      this.pru = true;
    }, 100);
  }
  clean() {
    this.equation = undefined;
    /**/
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
