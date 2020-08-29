import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import { galleryConfig } from "../models/config.model";
import { defaultGallery } from "../utils/gallery.config";
import { SwipeStore } from "core";

export const gService = new InjectionToken<galleryConfig>("gallery_Config");

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  readonly _instances = new Map<string, SwipeStore>();
  config: galleryConfig;
  
  constructor(@Optional() @Inject(gService) moduleConfig: galleryConfig) {
    this.config = moduleConfig ? { ...defaultGallery, ...moduleConfig } : defaultGallery;
  }

  ref(id = "root", config: galleryConfig) {
    return this._instances
      .set(
        id,
        new SwipeStore({ ...this.config, ...config }, this.deleteInstance(id))
      )
      .get(id);
  }

  private deleteInstance(id: string) {
    return () => {
      if (this._instances.has(id)) {
        this._instances.delete(id);
      }
    };
  }
}
