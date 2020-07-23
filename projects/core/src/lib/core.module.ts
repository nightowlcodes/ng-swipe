import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HammerModule } from '@angular/platform-browser';
import { LayoutModule } from "@angular/cdk/layout";
import { BidiModule } from "@angular/cdk/bidi";
import "hammerjs";
import { CoreComponent } from "./core.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ThumbsComponent } from "./components/thumbs/thumbs.component";
import { SlideComponent } from "./components/slide/slide.component";
import { SwipeDirective } from "./directives/swipe.directive";

import { SliderConfig } from "./models/config.model";
import { SwipeService, configService } from "./services/swipe.service";

@NgModule({
  declarations: [
    CoreComponent,
    NavigationComponent,
    PaginationComponent,
    ThumbsComponent,
    SlideComponent,
    SwipeDirective
  ],
  imports: [CommonModule, HammerModule, LayoutModule, BidiModule],
  exports: [CoreComponent, SlideComponent]
})
export class CoreModule {
  public static forRoot(config: SliderConfig): ModuleWithProviders<SliderConfig> {
    return {
      ngModule: CoreModule,
      providers: [
        SwipeService,
        {
          provide: configService,
          useValue: config
        }
      ]
    };
  }
}
