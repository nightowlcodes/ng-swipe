import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
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
  //State
  @Input() state;
  @Input() width: any;
  @ViewChild('Slider', {static: true}) slider : ElementRef
 resize: boolean;
  @Output() event = new EventEmitter<string | number>();
  busy: Observable<boolean>;
  constructor(private el: ElementRef) { }
  newconfig(): SliderConfig {
    let config: SliderConfig = {};
    (config.effect = this.config.slideEffect), (config.itemsPerView = 1);
    config.sliderHeight = this.config.slideHeight;
    config.navigate = this.config.slideNavigate;
    config.leftIcon = this.config.leftIcon;
    config.rightIcon = this.config.rightIcon;
    config.autoPlay = this.config.autoPlay;
    config.bgColor = this.config.bgColor;
    config.accentColor = this.config.accentColor;
    return config;
  }
  onEvent(e) {
    this.resize = false;
    this.event.emit(e);
  }

  onClick(e) {
    // this.lightbox.open();
    // this.lightbox.setConfig(this.config);
    // this.lightbox.setState(this.state);
    this.event.emit(e);
    
  }

  ngOnInit() {
    // this.busy = this.lightbox.busy;
    this.width = this.slider.nativeElement.offsetWidth;
  }

  onResize(e) {
    this.width = this.el.nativeElement.offsetWidth;
    this.resize = true;
  }
}
