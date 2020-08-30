import { Component, Input, Output, EventEmitter} from "@angular/core";
import { galleryConfig } from "../../models/config.model";
import { SwipeState } from "core";
import { ModalService } from '../../services/modal.service';
import { LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'ng-swipe-featured-img',
  templateUrl: './featured-img.component.html',
  styleUrls: ['./featured-img.component.scss'],

})
export class FeaturedImgComponent {

  @Input() state: SwipeState;
  @Input() config: galleryConfig;

  constructor(private modal: ModalService, private lightboxService: LightboxService ) {}

  onClick(i: number) {
    this.lightboxService.setConfig(this.config);
    this.lightboxService.setItems(this.state.items);
    this.lightboxService.setActive(i)
    this.modal.open(); 
  }
}
