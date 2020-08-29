import { Injectable, Inject} from "@angular/core";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import { galleryConfig } from "../models/config.model";
import { SwipeStore } from 'core';
@Injectable({
    providedIn: 'root'
})

export class LightboxService {

    _config : BehaviorSubject<any>;
    _items : BehaviorSubject<any>;
    config: Observable<any>;
    items: Observable<any>;
    constructor() {
       this._config = new BehaviorSubject({}); 
      this.config =  this._config.asObservable();
      this._items = new BehaviorSubject([]);
      this.items = this._items.asObservable();
    }

    setConfig(e) {
        this._config.next(e);
    }

    // setActive(e) {
    //     this.activeIndex = e;
    // }

    setItems(e) {
        this._items.next(e);
    }

    // getStore(e) {
    //     this.store = e; 
    // }
}