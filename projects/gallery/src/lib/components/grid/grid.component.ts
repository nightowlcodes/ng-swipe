import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { LightboxService } from '../../services/lightbox.service';
@Component({
  selector: 'ng-swipe-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent{
  @Input() state;
  @Input() config;
  @Output() event = new EventEmitter<string | number>();
  constructor( private modal: ModalService, private lightboxService: LightboxService) { }
  onClick(i) {
    this.lightboxService.setConfig(this.config);
    this.lightboxService.setItems(this.state.items);
    this.event.emit(i);
    this.modal.open(); 
    console.log('grid', i);
    
  }

}
