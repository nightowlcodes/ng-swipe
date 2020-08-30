import { Injectable, Inject} from "@angular/core";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import { galleryConfig } from "../models/config.model";
import { defaultGallery } from "../utils/gallery.config";
import { defaultState, SwipeState } from 'core';
@Injectable({
    providedIn: 'root'
})

export class LightboxService {

    _config : BehaviorSubject<galleryConfig>;
    _state : BehaviorSubject<SwipeState>;
    config: Observable<galleryConfig>;
    state: Observable<SwipeState>;
    constructor() {
       this._config = new BehaviorSubject(defaultGallery); 
      this.config =  this._config.asObservable();
      this._state = new BehaviorSubject(defaultState);
      this.state = this._state.asObservable();
    }

    setConfig(e) {
        this._config.next(e);
    }


    setActive(e) {
        this.setState({activeIndex: e})
    }

    setItems(e) {
        this.setState({items: e})
    }


    private setState(e) {
        this._state.next({...this._state.value, ...e});
    }



    // getStore(e) {
    //     this.store = e; 
    // }
}