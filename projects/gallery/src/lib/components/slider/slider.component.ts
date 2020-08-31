import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { galleryConfig } from "../../models/config.model";
import { SliderConfig, SwipeState } from "core";
import { Observable } from "rxjs";
@Component({
  selector: "ng-swipe-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
  @Input() config: galleryConfig;
  @Input() state: SwipeState;
  @Output() event = new EventEmitter<string | number>();
  busy: Observable<boolean>;
  activeItem: number;
  constructor() {}

  newconfig(): SliderConfig {
    let config: SliderConfig = {};
    (config.effect = this.config.slideEffect), (config.itemsPerView = 1);
    config.sliderHeight = this.config.slideHeight;
    config.initialItem = this.config.initialItem;
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
    if (e === "next") {
      this.activeItem = this.state.activeIndex + 1;
    } else if (e === "prev") {
      this.activeItem = this.state.activeIndex - 1;
    } else {
      this.activeItem = e;
    }
  }

  thumbClick(i: number) {
    this.event.emit(i);
    this.activeItem = i;
  }

  ngOnInit() {
    this.activeItem = this.state.activeIndex;
    // this.busy = this.lightbox.busy;
  }
}
