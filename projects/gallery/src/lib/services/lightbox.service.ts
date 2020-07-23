import { Injectable } from "@angular/core";
import { Overlay, ScrollStrategyOptions } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { LightboxComponent } from "../components/lightbox/lightbox.component";
import { BehaviorSubject, Observable } from "rxjs";
import { defaultState, SwipeState } from "core";
import { galleryConfig } from "../models/config.model";
import { defaultGallery } from "../utils/gallery.config";

@Injectable()
export class LightboxService {
  private _state: BehaviorSubject<SwipeState>;
  readonly state: Observable<SwipeState>;
  private _config: BehaviorSubject<galleryConfig>;
  readonly config: Observable<galleryConfig>;
  private _busy: BehaviorSubject<boolean>;
  readonly busy: Observable<boolean>;

  ref;
  width: number;
  store: any;
  constructor(
    private overlay?: Overlay,
    private scrollOptions?: ScrollStrategyOptions
  ) {
    this._state = new BehaviorSubject(defaultState);
    this.state = this._state.asObservable();
    this._config = new BehaviorSubject(defaultGallery);
    this.config = this._config.asObservable();
    this._busy = new BehaviorSubject(false);
    this.busy = this._busy.asObservable();
  }

  // Open Method
  open(): void {
    this.ref = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.scrollOptions.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      disposeOnNavigation: true
    });
    const component = new ComponentPortal(LightboxComponent);
    this.ref.attach(component);
    this.ref.backdropClick().subscribe(() => this.close());
    this._busy.next(true);
  }

  // Close Method
  close(): void {
    this.ref.dispose();
    this._busy.next(false);
  
  }

  setConfig(e: galleryConfig): void {
    let config = e;
    config.lightboxOptions = {
      ...this._config.value.lightboxOptions,
      ...e.lightboxOptions
    };
    config.lightboxSlider = {
      ...this._config.value.lightboxSlider,
      ...e.lightboxSlider
    };
    this._config.next({...this._config.value, ...config});
  }

  private setState(e: SwipeState): void {
    this._state.next({ ...this._state.value, ...e });
  }

  loadItems(items: any) {
    items ? this.setState({ items }) : null;
  }

  layoutDir(dir: string) {
    dir ? this.setState({ direction: dir }) : null;
  }

  setActive(i: number) {
    this.setState({
      activeIndex: i,
      hasNext: i < this._state.value.items.length - 1,
      hasPrev: i > 0
    });
  }

  prev() {
    this.setActive(this._state.value.activeIndex - 1);
  }

  next() {
    this.setActive(this._state.value.activeIndex + 1);
  }

  destroy() {
   
  }
}
