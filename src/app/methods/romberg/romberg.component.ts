import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-romberg',
  templateUrl: './romberg.component.html',
  styleUrls: ['./romberg.component.css']
})
export class RombergComponent implements OnInit {
  
  @Input() public valmin: number = 0;
  @Input() public valmax: number = 0;
  @Input() public valitera: number = 0;
  @Input() public valeval: string= "";
  constructor() { }

  ngOnInit() {
  }

}
