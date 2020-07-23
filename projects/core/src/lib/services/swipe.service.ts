import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import { SwipeStore } from "./swipe.store";
import { SliderConfig } from "../models/config.model";
import {defaultConfig} from "../utils/swipe.default";

export const configService = new InjectionToken<object>("slider_Config");

@Injectable({
  providedIn: "root"
})


export class SwipeService {
  readonly _instances = new Map<string, SwipeStore>();
  readonly config: SliderConfig;
  
  constructor( @Optional() @Inject(configService) moduleConfig: SliderConfig ) {
    this.config = moduleConfig ?  {...defaultConfig, ...moduleConfig} : defaultConfig;

  }

  ref(id = 'root', config?: any) {
      return this._instances.set(id, new SwipeStore({...this.config, ...config}, this.deleteInstance(id))).get(id);
  }

  private deleteInstance(id: string) {
    return () => {
      if (this._instances.has(id)) {
        this._instances.delete(id);
      }
    };
  }
}
