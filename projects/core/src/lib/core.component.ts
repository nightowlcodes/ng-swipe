import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

import { SwipeService } from "./services/swipe.service";
import { BreakpointsService } from "./services/breakpoints.service";
import { SliderConfig } from "./models/config.model";
import { defaultConfig } from "./utils/swipe.default";
import { Directionality } from "@angular/cdk/bidi";

@Component({
  selector: "ng-swipe-core",
  template: `
    <ng-swipe-slide
      [state]="swipeStore.state | async"
      [config]="swipeStore.config | async"
      (event)="onEvent($event)"
      [width]="width"
      [resize]="resize"
      type="full"
      (window:resize)="onResize($event)"
    >
    </ng-swipe-slide>
  `,
  styles: [":host {display: block}"],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnInit, OnDestroy {
  @Input() images: Array<string>;
  @Input() id: string;
  @Input() dir: string;
  @Input() config: SliderConfig;
  @Input() activeItem: number;
  @Output() lightboxEvent = new EventEmitter<string | number>();
  width: number;
  resize: boolean = false;
  swipeStore: any;

  constructor(
    private _swipe: SwipeService,
    private el: ElementRef,
    private biDir: Directionality,
    private responsive: BreakpointsService
  ) {}

  ngOnInit() {
    this.config ? this.config : (this.config = this._swipe.config);

    this.width = this.el.nativeElement.offsetWidth;

    // get Slider ref
    this.swipeStore = this._swipe.ref(this.id, this.config);

    this.swipeStore.setConfig(this.config);

    // set Items
    this.swipeStore.loadItems(this.images);

    // set Layout Direction
    this.dir
      ? this.swipeStore.layoutDir(this.dir)
      : this.swipeStore.layoutDir(this.biDir.value);

    this.swipeStore.setActive();

    // Check If Breakpoints options
    this.config.breakpoints !== undefined
      ? this.responsive.responsiveConfig(
          this.config,
          defaultConfig,
          this.swipeStore
        )
      : null;

    this.activeItem
      ? this.onEvent(this.activeItem)
      : this.onEvent(this.config.initialItem);
  }

  onResize($event): void {
    this.width = this.el.nativeElement.offsetWidth;
    this.resize = true;
  }

  onEvent(i: string | number) {
    this.resize = false;
    if (i === "next") {
      this.swipeStore.next();
    } else if (i === "prev") {
      this.swipeStore.prev();
    } else {
      this.swipeStore.setActive(<number>i);
    }
    this.lightboxEvent.emit(i)
  }

  ngOnDestroy() {
    this.swipeStore.destroy();
  }
}
