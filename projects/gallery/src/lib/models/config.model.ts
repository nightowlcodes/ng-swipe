import {breakPointsValues} from 'core';

type BreakPoints = {[d in breakPointsValues]?: galleryConfig};

interface autoPlay {
  delay: number;
  stopOnHover?: boolean,
} 


export interface galleryConfig {
    type?: "grid" | "featuredImg" | "slideGallery";
    initialItem? : number;
    countBtn?: boolean;
    viewIcon?: string;
    showTitle?: boolean
    spaceBetween?: number;
    itemsPerRow? : number;
    slideEffect?: "swipe" | "fade",
    slideHeight?: number,
    slideNavigate?: boolean,
    autoPlay?: autoPlay,
    leftIcon?: string,
    rightIcon?: string,
    openOnClick?: boolean,
    thumbs?: boolean;
    itemHeight?: number,
    accentColor?: string,
    bgColor?: string,
    textColor?: string,
    lightboxSlider?: LightboxSlider;
    lightboxOptions?: Lightbox;
    breakpoints?: BreakPoints
 }
  
  interface Lightbox {
    closeOnEscpae?: boolean;
    closeBtn?: boolean;
    closeBtnIcon?: 'string';
    showCount?: boolean;
    showTitle?: boolean;
    background?: string;
    textColor?: string,

  }

  interface LightboxSlider {
    effect?: "swipe" | "fade";
    autoPlay?: autoPlay;
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
  }