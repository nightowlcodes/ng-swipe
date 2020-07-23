import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import { LightboxService } from '../../services/lightbox.service';
@Component({
  selector: 'ng-swipe-featured-img',
  templateUrl: './featured-img.component.html',
  styleUrls: ['./featured-img.component.scss'],

})
export class FeaturedImgComponent implements OnInit {

  @Input() state;
  @Input() config;
  @Output() event = new EventEmitter<number>()
  constructor(private lightbox: LightboxService) {}
  ngOnInit() {
    
   }
  onClick(i) {
    this.lightbox.loadItems(this.state.items);
    this.lightbox.setConfig(this.config);
    this.event.emit(i);
    this.lightbox.setActive(i);
    this.lightbox.open();
}

}
