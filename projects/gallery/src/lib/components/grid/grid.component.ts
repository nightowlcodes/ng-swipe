import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { LightboxService } from '../../services/lightbox.service';
import { LightboxStore } from '../../services/lightbox.store';

@Component({
  selector: 'ng-swipe-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() state;
  @Input() config;
  @Input() store : LightboxStore;
  @Output() event = new EventEmitter<string | number>();
  constructor( private modal: ModalService, private lightboxService: LightboxService) { }

  ngOnInit() {
  
  }

  onClick(i) {
    this.lightboxService.getStore(this.store);
    console.log('ssfC', this.config);
    this.event.emit(i);
    this.modal.open(); 
}

}
