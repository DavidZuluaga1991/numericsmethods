import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
