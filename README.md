# @ng-swipe/core

Angular Library for galleries in beta.

## Install

Run `npm i @ng-swipe/core` to install the package. 

## How to

 -After installing the library import it in the module you desire `import { CoreModule } from "@ng-swipe/core"`.
 - use the component `<ng-swipe-core [images]="data" id="2" dir="ltr"></ng-swipe-core>` and provide the images @Input.
 - the slider have default configuration but you can provide your own option by using one of two methods :
  - provide global config at Module level `CoreModule.forRoot(config: SliderConfig)`.
  - provide component level config ` <ng-swipe-core [images]="data" [config]="config" id="1" dir="ltr"></ng-swipe-core>`.
 
##  Options model
  
    effect?: "swipe" | "fade" ;
    autoPlay?: autoPlay ;
    sliderHeight?: number;
    initialItem?: number;
    itemsPerView?: number;
    navigate?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    paginate?: boolean;
    thumbs?: boolean;
    thumbsHeight?: number;
    thumbsPerView?: number;
    thumbsMove?: "item" | "group";
    itemSpaceX?: number;
    itemSpaceY?: number;
    bgColor?: string;
    accentColor?: string;
    breakpoints?: BreakPoints;
    
 ## Breakpoints keys
   "XSmall": SliderConfig | "Small"": SliderConfig | "Medium"": SliderConfig | "Large"": SliderConfig
   | "XLarge"": SliderConfig | "Handset"": SliderConfig | "Tablet"": SliderConfig | "HandsetPortrait"": SliderConfig 
   | "TabletPortrait"": SliderConfig | "HandsetLandscape"": SliderConfig | "TabletLandscape": SliderConfig"
   
