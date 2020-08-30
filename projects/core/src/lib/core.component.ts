import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation,
  SimpleChange,
} from "@angular/core";

import { SwipeService } from "./services/swipe.service";
import { SwipeStore } from "./services/swipe.store";
import { BreakpointsService } from "./services/breakpoints.service";
import { SliderConfig } from "./models/config.model";
import { defaultConfig } from "./utils/swipe.default";
import { Directionality } from "@angular/cdk/bidi";

@Component({
  selector: "ng-swipe-core",
  template: `
    <ng-swipe-slide
      [state]="store.state | async"
      [config]="store.config | async"
      (event)="onEvent($event)"
      [width]="width"
      [resize]="resize"
      [type]="sliderType"
      (window:resize)="onResize($event)"
    >
    </ng-swipe-slide>
  `,
  styles: [":host {display: block}"],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent implements OnInit, OnDestroy {
  @Input() images: [];
  @Input() id: string;
  @Input() dir: string;
  @Input() config: SliderConfig;
  @Input() activeItem: number;
  @Input() sliderType: string;
  @Output() galleryEvent = new EventEmitter<string | number>();
  width: number;
  resize: boolean = false;
  store: SwipeStore;

  constructor(
    private _swipe: SwipeService,
    private el: ElementRef,
    private biDir: Directionality,
    private responsive: BreakpointsService
  ) {}

  ngOnInit() {
    this.config ? this.config : (this.config = this._swipe.config);

    this.width = this.el.nativeElement.offsetWidth;

    // get Slider reference
    this.store = this._swipe.ref(this.id, this.config);

    this.store.setConfig(this.config, defaultConfig);
    // set Items
    this.store.loadItems(this.images);

    // set Layout Direction
    this.dir
      ? this.store.layoutDir(this.dir)
      : this.store.layoutDir(this.biDir.value);

    // Check If Breakpoints options
    this.config.breakpoints !== undefined
      ? this.responsive.responsiveConfig(this.config, this.store, defaultConfig)
      : null;

    !this.sliderType ? (this.sliderType = "full") : null;

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
      this.store.next();
    } else if (i === "prev") {
      this.store.prev();
    } else {
      this.store.setActive(<number>i);
    }
    this.galleryEvent.emit(i);
  }

  ngOnChanges(changes: { [activeItem: number]: SimpleChange }) {
    if (changes["activeItem"] && this.activeItem >= 0 && this.store) {
      this.store.setActive(this.activeItem);
    }
  }

  ngOnDestroy() {
    this.store.destroy();
  }
}
