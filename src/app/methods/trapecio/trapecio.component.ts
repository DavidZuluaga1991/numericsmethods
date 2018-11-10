import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trapecio',
  templateUrl: './trapecio.component.html',
  styleUrls: ['./trapecio.component.css']
})
export class TrapecioComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }
}
