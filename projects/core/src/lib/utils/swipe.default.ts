import { SwipeState } from "../models/slider.model";
import {SliderConfig} from "../models/config.model"
export const defaultState: SwipeState = {
  direction: "ltr",
  activeIndex: 0,
  hasPrev: false,
  hasNext: true,
  items: []
};

export const defaultConfig: SliderConfig = {
  effect: "swipe",
  sliderHeight: 400,
  initialItem: 0,
  itemsPerView: 1,
  navigate: true,
  leftIcon: `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
  rightIcon: `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
  paginate: true,
  thumbs: false,
  thumbsHeight: 60,
  thumbsPerView: 8,
  thumbsMove: "group",
  itemSpaceX: 0,
  itemSpaceY: 0,
  bgColor: "white",
  accentColor: "red",
  breakpoints: {
    XSmall: {
      thumbsPerView: 2,
      
    }
  },

};

