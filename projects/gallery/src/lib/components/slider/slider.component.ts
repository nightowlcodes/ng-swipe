import {
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { galleryConfig } from "../../models/config.model";
import { SliderConfig } from "core";
import { Observable } from "rxjs";
@Component({
  selector: 'ng-swipe-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],

})
export class SliderComponent {
  @Input() config: galleryConfig;
  @Input() state;
  @Output() event = new EventEmitter<string | number>();
  busy: Observable<boolean>;
  activeItem: number;
  constructor() { }

  newconfig(): SliderConfig {
    let config: SliderConfig = {};
    (config.effect = this.config.slideEffect), (config.itemsPerView = 1);
    config.sliderHeight = this.config.slideHeight;
    config.initialItem =this.config.initialItem;
    config.navigate = this.config.slideNavigate;
    config.leftIcon = this.config.leftIcon;
    config.rightIcon = this.config.rightIcon;
    config.autoPlay = this.config.autoPlay;
    config.bgColor = this.config.bgColor;
    config.accentColor = this.config.accentColor;
    return config;
  }

  onEvent(e) {
    this.event.emit(e);  
    if ( e === 'next') {
      this.activeItem = this.state.activeIndex + 1;
    } else if (e === 'prev') {
      this.activeItem = this.state.activeIndex - 1;
    } else {
      this.activeItem = e;
    }
  }

  thumbClick(e) {
    this.event.emit(e);
    this.activeItem = e; 
  }

  ngOnInit() {
    this.activeItem = this.state.activeIndex; 
    
    // this.busy = this.lightbox.busy;
  
    
  }

}
