import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simpson',
  templateUrl: './simpson.component.html',
  styleUrls: ['./simpson.component.css']
})
export class SimpsonComponent implements OnInit {

  @Input() public valmin: number = 0;
  @Input() public valmax: number = 0;
  @Input() public valitera: number = 0;
  @Input() public valeval: string= "";
  constructor() { }

  ngOnInit() {
  }
}
