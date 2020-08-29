import { Component, Input, Output, EventEmitter} from "@angular/core";
import { ModalService } from '../../services/modal.service';
import { LightboxService } from '../../services/lightbox.service';


@Component({
  selector: 'ng-swipe-featured-img',
  templateUrl: './featured-img.component.html',
  styleUrls: ['./featured-img.component.scss'],

})
export class FeaturedImgComponent {

  @Input() state;
  @Input() config;
  @Output() event = new EventEmitter<number>();

  constructor(private modal: ModalService, private lightboxService: LightboxService ) {}
  onClick(i) {
    this.lightboxService.setConfig(this.config);
    this.lightboxService.setItems(this.state.items);
    this.event.emit(i);
    this.modal.open(); 
  }
}
