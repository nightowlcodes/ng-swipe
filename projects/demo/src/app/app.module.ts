import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule, SliderConfig } from "core";

import { AppComponent } from './app.component';
const config : SliderConfig = {
  effect: "swipe",
  
   initialItem: 1,
   navigate: true,
   paginate: true,
   thumbs: true,
   thumbsHeight: 60,
   thumbsPerView: 6,
 
 }
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
