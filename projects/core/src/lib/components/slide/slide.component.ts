import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  HostListener,
} from "@angular/core";
import { SwipeState } from "../../models/slider.model";

@Component({
  selector: "ng-swipe-slide",
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.scss"],

})
export class SlideComponent implements OnInit, OnChanges {
  itemWidth;

  // Config
  @Input() config;
  @Input() state: SwipeState;
  @Input() width: number;
  @Input() resize: boolean;
  @Input() busy: boolean;
  @Input() type: 'full' | 'minimal';
  auto: any;

  @Output() event = new EventEmitter<string | number>();

  // Deactivate autoPlay on Pan

  @HostListener("panstart") onPan() {
    this.config.autoPlay !== undefined
      ? (clearInterval(this.auto), (this.busy = true))
      : null;
  }

  @HostListener("panend") onPanEnd() {
    if (this.config.autoPlay !== undefined) {
      this.busy = false;
      clearInterval(this.auto);
      this.autoPlay();
    }
  }

  panEnd(e) {
    this.updateSlider(e.deltaX, e.deltaTime, e.distance);
  }

  mouseEnter() {
    if (
      this.config.autoPlay !== undefined &&
      this.config.autoPlay.stopOnHover === true
    ) {
      clearInterval(this.auto);
      this.busy = true;
    }
  }

  mouseLeave() {
    if (
      this.config.autoPlay !== undefined &&
      this.config.autoPlay.stopOnHover === true
    ) {
      this.busy = false;
      clearInterval(this.auto);
      this.autoPlay();
    }
  }

  private validMove(time, distance): boolean {
    return this.config.effect === "fade" && this.config.crossFade === false
      ? true
      : time > 200 || time < 200
      ? true
      : false;
  }

  private updateSlider(deltaX, time, distance) {
    if (this.validMove(time, distance)) {
      switch (this.state.direction) {
        case "ltr":
          deltaX < 0 && this.state.hasNext
            ? this.next()
            : deltaX > 0 && this.state.hasPrev
            ? this.prev()
            : this.setActive();
          break;
        case "rtl":
          deltaX > 0 && this.state.hasNext
            ? this.next()
            : deltaX < 0 && this.state.hasPrev
            ? this.prev()
            : this.setActive();
      }
    } else {
      this.setActive();
    }
  }

  private next() {
    this.event.emit("next");
  }

  private prev() {
    this.event.emit("prev");
  }

  private setActive() {
    this.event.emit(this.state.activeIndex);
  }

  ngOnInit() {

    this.config.lightboxSlider && this.type === "full"
      ? (this.config = this.config.lightboxSlider)
      : this.config;
      
   const itemsCount = this.config.itemsPerView === undefined ? 1 : this.config.itemsPerView;  
    this.itemWidth = this.width / this.config.itemsPerView;
    if (this.config.autoPlay !== undefined) {
      this.autoPlay();
      
    }

   
    

    
    
  }

  private autoPlay() {
    // this.state.activeIndex < this.state.items.length - 1
    //   ? (this.auto = setInterval(() => {
    //       this.next();
    //     }, this.config.autoPlay.delay))
    //   : null;
  }

  ngOnChanges(changes: SimpleChanges) {

    this.resize
      ? (this.itemWidth = this.width / this.config.itemsPerView)
      : null;

    if (this.config.autoPlay !== undefined) {
      if (this.state.activeIndex >= this.state.items.length - 1) {
        clearInterval(this.auto);
      } else if (
        changes.state !== undefined &&
        changes.state.previousValue !== undefined &&
        !this.busy
      ) {
        clearInterval(this.auto);
        this.autoPlay();
      }

      this.busy ? clearInterval(this.auto) : null;
    }
  }
}
