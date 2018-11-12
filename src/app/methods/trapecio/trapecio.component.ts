import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trapecio',
  templateUrl: './trapecio.component.html',
  styleUrls: ['./trapecio.component.css']
})
export class TrapecioComponent implements OnInit {

  @Input() public valmin: number = 0;
  @Input() public valmax: number = 0;
  @Input() public valitera: number = 0;
  @Input() public valeval: string= "";
  
  constructor() { }

  ngOnInit() {
  }
}
