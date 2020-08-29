import { defaultState, SwipeState } from "core";
import { galleryConfig } from "../models/config.model";

import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LightboxStore {
    private _state: BehaviorSubject<SwipeState>;
    readonly state: Observable<SwipeState>;
    private _config: BehaviorSubject<galleryConfig>;
    readonly config: Observable<galleryConfig>;
 

    constructor() {
        this._state = new BehaviorSubject(defaultState);
        this.state = this._state.asObservable();
        this._config = new BehaviorSubject({});
        this.config = this._config.asObservable();
    }

    setConfig(e: galleryConfig): void {
        let config = Object.assign({},e);
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

}