import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import { ModalService } from '../../services/modal.service';
import { LightboxStore } from '../../services/lightbox.store';
import { LightboxService } from '../../services/lightbox.service';


@Component({
  selector: 'ng-swipe-featured-img',
  templateUrl: './featured-img.component.html',
  styleUrls: ['./featured-img.component.scss'],

})
export class FeaturedImgComponent implements OnInit {

  @Input() state;
  @Input() config;
  @Input() store : LightboxStore;
  @Output() event = new EventEmitter<number>();

  constructor(private modal: ModalService, private lightboxService: LightboxService ) {}
  ngOnInit() {
    
  
  }

  onClick(i) {
    this.lightboxService.getStore(this.store);  
    this.event.emit(i);
    this.modal.open(); 
}

ngOnDestroy() {
}

}
