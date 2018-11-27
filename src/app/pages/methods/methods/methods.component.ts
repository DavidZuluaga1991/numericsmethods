import { Component, OnInit, Input,EventEmitter, Output, ViewChild} from '@angular/core';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.css']
})
export class MethodsComponent implements OnInit {

  @Input() public valuemin: number = 0;
  @Input() public valuemax: number = 0;
  @Input() public valueitera: number = 0;
  @Input() public resultintegral: number = 0;
  @Input() public eval: string= "";
  
  titlerieman: string = "";
  titletrapecio: string = "";
  titlesimpson: string = "";
  
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  errorevent: any[] = [];

  constructor() { }

  ngOnInit() {
  }
  error(event){
    let e = event;
    this.errorevent.push(e);
    let per = `${e.PER} %`;
    if(e.method ==="Rieman"){
      this.titlerieman = per;
    }
    if(e.method ==="Trapecio"){
      this.titletrapecio = per;
    }
    if(e.method ==="Simpson"){
      this.titlesimpson = per;
    }
    //console.log(e);
    console.log(this.errorevent);
  }
}
