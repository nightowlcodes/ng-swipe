import { galleryConfig } from "../models/config.model";

export const defaultGallery: galleryConfig = {
  type: "grid",
  countBtn: true,
  initialItem: 0,
  itemsPerRow: 8,
  showTitle: false,
  slideEffect: "fade",
  slideHeight: 360,
  slideNavigate: true,
  leftIcon: `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
  rightIcon: `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
  openOnClick: true,
  thumbs: false,
  itemHeight: 60,
  spaceBetween: 0,
  bgColor: "white",
  accentColor: "red",
  lightboxOptions: {
    closeBtn: true,
    background: "red",
    textColor: "white",
    showCount: true,
    showTitle: true,
  },
  lightboxSlider: {
    effect: "fade",
    sliderHeight: 400,
    initialItem: 0,
    itemsPerView: 1,
    navigate: true,
    leftIcon: `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
    rightIcon: `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
    paginate: true,
    thumbs: true,
    thumbsHeight: 60,
    thumbsPerView: 8,
    itemSpaceX: 8,
    itemSpaceY: 8,
    bgColor: "white",
    accentColor: "red",
  },
 
};
