import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule, SliderConfig } from "core";
import {GalleryModule} from "gallery";
import { AppComponent } from './app.component';

const config : SliderConfig = {
  effect: "swipe",
   initialItem: 0,
   navigate: true,
   paginate: true,
   thumbs: true,
   thumbsHeight: 60,
   thumbsPerView: 8,
 }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(config),
    GalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
