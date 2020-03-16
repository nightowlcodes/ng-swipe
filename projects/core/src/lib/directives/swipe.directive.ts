import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  HostListener,
  OnChanges,
  OnInit
} from "@angular/core";

@Directive({
  selector: "[ng-swiper]"
})
export class SwipeDirective implements OnInit, OnChanges {
  storeX: number = 0;
  transitionTime: string;
  @Input() state;
  @Input() width;
  itemsPerView;
  @Input() config;
  constructor(
    private el: ElementRef,
    private render: Renderer2,
  ) {}



  @HostListener("pan", ["$event"]) onPan(e) {
    this.render.removeStyle(this.el.nativeElement, "transition-duration");
    this.render.setStyle(
      this.el.nativeElement,
      "transform",
      "translate3d(" + (this.storeX + e.deltaX) + "px, 0,0)"
    );
  }

  @HostListener("panend", ["$event"]) onPanEnd(e) {
    this.render.setStyle(
      this.el.nativeElement,
      "transform",
      "translate3d(" + this.storeX + "px, 0,0)"
    );
    this.render.setStyle(this.el.nativeElement, "transition-duration", `300ms`);
    // setTimeout(()=> {
    //   this.render.removeStyle(this.el.nativeElement, "transition-duration");
    // }, 400)
  } 

  // deal with multi width on resize and load as well , check for item width here

  goToSlide(e, width?, view?): void {

    width ? (this.width = width) : this.width=this.el.nativeElement.offsetWidth;
    this.storeX = this.state.direction === "ltr" ? e * -(width / view) : e * width;
    this.render.setStyle(this.el.nativeElement, "transition", 'transform 0.3s ease');
    this.render.setStyle(
      this.el.nativeElement,
      "transform",
      "translate3d(" + this.storeX + "px, 0,0)"
    );

  }

 
  ngOnInit() {
    this.itemsPerView = this.config == undefined ? 1 : this.config.itemsPerView;
    this.goToSlide(this.state.activeIndex, this.width, this.itemsPerView);
  }
  
  ngOnChanges() {
  this.goToSlide(this.state.activeIndex, this.width, this.itemsPerView);
  }
}
