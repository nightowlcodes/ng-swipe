import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  OverlayModule,
  OverlayContainer,
  FullscreenOverlayContainer,
} from "@angular/cdk/overlay";
import { BidiModule } from "@angular/cdk/bidi";
import { CoreModule } from "core";
import { galleryConfig } from "./models/config.model";
import { ConfigService, gService } from "./services/config.service";

import { GalleryComponent } from "./gallery.component";
import { FeaturedImgComponent } from "./components/featured-img/featured-img.component";
import { GridComponent } from "./components/grid/grid.component";
import { SliderComponent } from "./components/slider/slider.component";
import { LightboxComponent } from "./components/lightbox/component/lightbox.component";
import { ModalWrapComponent } from "./components/lightbox/modal-wrap.component";
import { ModalService } from "./services/modal.service";

@NgModule({
  declarations: [
    GalleryComponent,
    FeaturedImgComponent,
    GridComponent,
    SliderComponent,
    ModalWrapComponent,
    LightboxComponent,
  ],
  imports: [CommonModule, OverlayModule, BidiModule, CoreModule],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    ModalService,
  ],
  exports: [GalleryComponent],
})
export class GalleryModule {
  static forRoot(config: galleryConfig): ModuleWithProviders<GalleryModule> {
    return {
      ngModule: GalleryModule,
      providers: [
        ConfigService,
        {
          provide: gService,
          useValue: config,
        },
      ],
    };
  }
}
