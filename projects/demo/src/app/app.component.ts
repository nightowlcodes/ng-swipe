import { Component } from '@angular/core';
import {SliderConfig} from 'core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  data = [
    {source:"../assets/imgs/image-1.jpg", title: "Image 1"},
    {source:"../assets/imgs/image-2.jpg", title: "Image 2"},
    {source:"../assets/imgs/image-3.jpg", title: "Image 3"},
    {source:"../assets/imgs/image-4.jpg", title: "Image 4"},
    {source:"../assets/imgs/image-5.jpg", title: "Image 5"},
    {source:"../assets/imgs/image-6.jpg", title: "Image 6"},
    {source:"../assets/imgs/image-7.jpg", title: "Image 7"},
    {source:"../assets/imgs/image-8.jpg", title: "Image 8"},
    {source:"../assets/imgs/image-9.jpg", title: "Image 9"},
    {source:"../assets/imgs/image-10.jpg", title: "Image 10"},
    {source:"../assets/imgs/image-11.jpg", title: "Image 11"},
    {source:"../assets/imgs/image-12.jpg", title: "Image 12"},
    {source:"../assets/imgs/image-13.jpg", title: "Image 13"},
    {source:"../assets/imgs/image-14.jpg", title: "Image 14"},
    {source:"../assets/imgs/image-15.jpg", title: "Image 15"},
    {source:"../assets/imgs/image-16.jpg", title: "Image 16"},
    {source:"../assets/imgs/image-17.jpg", title: "Image 17"}
  ];
  otherImages = [
    "../assets/imgs/image-1.jpg",
    "../assets/imgs/image-2.jpg",
    "../assets/imgs/image-3.jpg",
    "../assets/imgs/image-4.jpg",
    "../assets/imgs/image-5.jpg",
    "../assets/imgs/image-6.jpg",
    "../assets/imgs/image-7.jpg"
  ];

  config: SliderConfig = {
    effect: "fade",
    sliderHeight: 400,
    initialItem: 0,
    navigate: true,
    paginate: true,
    thumbs: true,
    thumbsHeight: 60,
    thumbsPerView: 8,
    breakpoints: {
      Small: {
        thumbsPerView: 4
      }
    }
  };

  cConf: any = {
    type: "featuredImg",
    initialItem: 2,
    slideEffect: "swipe",
    lightboxOptions: {
      background: '#000',
      showCount: true,
      showTitle: true,
    },
    lightboxSlider: {
      itemSpaceX: 6,
      itemSpaceY: 6,
      bgColor: "purple",
      accentColor: 'white',
      autoPlay: {
        delay: 2000,
        stopOnHover: true
    
      }
    },
    breakpoints: {
      Small: {
        lightboxSlider: {
          thumbsPerView: 2,
        }
      }
    }
  
  };
  Conf: any = {
    type: "grid",
    initialItem: 3,
    slideEffect: "swipe",
    thumbs: true,
    itemsPerRow: 4,
    lightboxOptions: {
      background: '#ff5254',
   
    },
    lightboxSlider: {
      thumbsPerView: 7,
      itemSpaceX: 6,
      itemSpaceY: 6,
      bgColor: "blue",
      accentColor: 'white',
      autoPlay: {
        delay: 2000,
        stopOnHover: true
    
      }
    },
    breakpoints: {
      XSmall: {itemsPerRow: 6}
    }
  };
}
