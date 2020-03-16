import { SwipeState } from "../models/slider.model";

import { defaultState } from "../utils/swipe.default";
import { BehaviorSubject, Observable } from "rxjs";

export class SwipeStore {
  private _state: BehaviorSubject<SwipeState>;
  private _config: BehaviorSubject<object>;
  readonly state: Observable<SwipeState>;
  readonly config: Observable<object>;
  constructor( config : object, private  deleteInstance : Function) {
    this._state = new BehaviorSubject(defaultState);
    this.state = this._state.asObservable();
    this._config = new BehaviorSubject(config);
    this.config = this._config.asObservable();
  }

  private setState(state: SwipeState) {
    this._state.next({ ...this._state.value, ...state });
  }

  loadItems(items: string[]) {
    items ? this.setState({ items: items }) : null;
  }

  layoutDir(dir: string) {
    dir ? this.setState({ direction: dir }) : null;
  }

  setConfig(data: any) {
      this._config.next({...this._config.value, ...data });
  }

  // set current ActiveIndex to Component State
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
    this._state.complete();
    this._config.complete();
    this.deleteInstance()
  }
}
