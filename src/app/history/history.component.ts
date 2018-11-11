import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../services/app-service.service';
import { KatexOptions } from 'ng-katex';
import { firebases } from '../integral/models/firebase';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historysIntegral: firebases[];

  equation: string;
  valuemin: number = 0;
  valuemax: number = 0;
  valueitera: number = 0;

  options: KatexOptions = {
    displayMode: true,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: { "\\f": "f(#1)" }
  };
  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.service.getHistorys().subscribe( (data: firebases[]) => {
      this.historysIntegral = data;
    });
  }

  resultEvent(fire: firebases){
    this.equation = fire.equation;
  }

}
