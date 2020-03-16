import {
  Component,
  Input,
  ViewChild,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
  HostListener,
  SimpleChanges
} from "@angular/core";

import { SwipeState } from "../../models/slider.model";

@Component({
  selector: "ng-swipe-thumbs",
  templateUrl: "./thumbs.component.html",
  styleUrls: ["./thumbs.component.scss"]
})
export class ThumbsComponent implements OnChanges {
  thumbWidth: number = 0;
  private storeX: number = 0;
  private maxSpace: number;
  @Input() width: number;
  @Input() state: SwipeState;
  @Input() config;
  @Output() event = new EventEmitter<number>();

  @ViewChild("thumbsContainer", {static: true}) elWrapper: ElementRef;

  constructor(private render: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
   if (changes) {
    this.updateThumbs(this.state.activeIndex);
   } 
  }

  @HostListener("pan", ["$event"]) onPan(e) {
    this.thumbsSwipe(e.deltaX + this.storeX, "0ms");
  }

  @HostListener("panend", ["$event"]) onEnd(e) {
    e.deltaX += e.velocityX * 70;
    switch (this.state.direction) {
      case "ltr":
        this.ltrSwipe(e, this.maxSpace);
        break;
      case "rtl":
        this.rtlSwipe(e, this.maxSpace);
    }
  }

  private ltrSwipe(e, maxSpace): void {
    if (e.deltaX < 0) {
      this.storeX > -maxSpace && this.storeX + e.deltaX > -maxSpace
        ? (this.storeX += e.deltaX)
        : (this.storeX = -maxSpace);
    }

    if (e.deltaX > 0) {
      this.storeX < 0 && this.storeX + e.deltaX < 0
        ? (this.storeX += e.deltaX)
        : (this.storeX = 0);
    }
    this.thumbsSwipe(this.storeX, "300ms");
  }

  private rtlSwipe(e, maxSpace): void {
    if (e.deltaX > 0) {
      this.storeX < maxSpace && this.storeX + e.deltaX < maxSpace
        ? (this.storeX += e.deltaX)
        : (this.storeX = maxSpace);
    }
    if (e.deltaX < 0) {
      this.storeX > 0 && this.storeX + e.deltaX > 0
        ? (this.storeX += e.deltaX)
        : (this.storeX = 0);
    }
    this.thumbsSwipe(this.storeX, "300ms");
  }

  private thumbsSwipe(e, transition: string): void {
    this.render.setStyle(
      this.elWrapper.nativeElement,
      "transform",
      `translate3d(${e}px, 0,0)`
    );

    this.render.setStyle(
      this.elWrapper.nativeElement,
      "transition-duration",
      `${transition}`
    );
  }

  private updateThumbs(e): void {
    const width = this.width
      ? this.width
      : this.elWrapper.nativeElement.offsetWidth;

    switch (this.state.direction) {
      case "ltr":
        this.thumbsMove(e, width, -1);
        break;
      case "rtl":
        this.thumbsMove(e, width, 1);
    }
  }

  private thumbsMove(e: number, width: number, sign: number): void {
    this.thumbWidth =
      width / this.config.thumbsPerView - this.config.itemSpaceX;

    this.maxSpace =
      (this.thumbWidth + this.config.itemSpaceX) *
      (this.state.items.length - this.config.thumbsPerView);

    if (this.config.thumbsMove === "item") {
      e === 0
        ? (this.storeX = this.thumbWidth * e * sign)
        : this.thumbWidth * e >= this.maxSpace
        ? (this.storeX = this.maxSpace * sign)
        : (this.storeX = (this.thumbWidth + this.config.itemSpaceX) * e * sign);
    } else {
      e++;
      // Group items sharing one view
      const groupIndex = Math.ceil(e / this.config.thumbsPerView) - 1;
      const lastGroup = Math.ceil(
        this.state.items.length / this.config.thumbsPerView
      );
      const maxItems = lastGroup * this.config.thumbsPerView;
      const lastGroupItems = maxItems % this.state.items.length;
      const ifLastGroup = groupIndex + 1 === lastGroup ? true : false;

      // Moving thumbs on action
      (this.config.thumbsPerView * groupIndex) % e === 0 && !ifLastGroup
        ? (this.storeX = width * groupIndex * sign)
        : ifLastGroup && lastGroupItems !== 0
        ? (this.storeX = this.maxSpace * sign)
        : !ifLastGroup
        ? (this.storeX = width * groupIndex * sign)
        : null;
    }

    this.thumbsSwipe(this.storeX, "300ms");
  }
}
