import { Component, OnInit, ViewChild } from '@angular/core';
import { RiemanComponent } from '../rieman/rieman.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  valuemin: number;
  valuemax: number;
  valueitera: number;
  eval: string;
  method: string;
  @ViewChild(RiemanComponent) rieman: RiemanComponent;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
