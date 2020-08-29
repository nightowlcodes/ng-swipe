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

 const Conf: any = {
  type: "grid",
  initialItem: 3,
  slideEffect: "swipe",
  thumbs: true,
  itemsPerRow: 4,
  lightboxOptions: {
    background: '#ff5254',
 
  },
  lightboxSlider: {
    effect: "fade",
    sliderHeight: 400,

    itemsPerView: 1,
    thumbsPerView: 7,
    itemSpaceX: 6,
    itemSpaceY: 6,
    bgColor: "blue",
    accentColor: 'white',
    autoPlay: {
      delay: 2000,
      stopOnHover: true
  
    },
    breakpoints: {
      XSmall: {thumbsPerView: 3}
    }
  },
  breakpoints: {
    XSmall: {itemsPerRow: 6}
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(config),
    GalleryModule.forRoot(Conf)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
