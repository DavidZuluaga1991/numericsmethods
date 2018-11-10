import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rieman',
  templateUrl: './rieman.component.html',
  styleUrls: ['./rieman.component.css']
})
export class RiemanComponent implements OnInit {


  //@ViewChild(AddPropertiesComponent) addproperties: AddPropertiesComponent; 

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }
}
