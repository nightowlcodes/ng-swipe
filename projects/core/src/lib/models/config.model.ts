
export type breakPointsValues = "XSmall" | "Small" | "Medium" | "Large" 
| "XLarge" | "Handset" | "Tablet" | "HandsetPortrait" | "TabletPortrait"
| "HandsetLandscape" | "TabletLandscape";

type BreakPoints = {[d in breakPointsValues]?: SliderConfig};

interface autoPlay  {
  delay: number,
  stopOnHover?: boolean
}

export interface SliderConfig {
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
  }

