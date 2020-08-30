import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from "@angular/core";
import { Directionality } from "@angular/cdk/bidi";
import { BreakpointsService, SwipeStore, defaultConfig } from "core";
import { galleryConfig } from "./models/config.model";
import { ConfigService } from "./services/config.service";
import { defaultGallery } from './utils/gallery.config';


@Component({
  selector: 'ng-swipe-gallery',
  template: `
  <ng-container  *ngIf="type === 'grid'">
  <ng-swipe-grid
  [state]="galleryStore.state | async"
  [config]="galleryStore.config | async"
>
</ng-swipe-grid>
</ng-container>

<ng-container  *ngIf="type === 'slideGallery'">
  <ng-swipe-slider
  [state]="galleryStore.state | async"
  [config]="galleryStore.config | async"
  (event)="onEvent($event)"
>
</ng-swipe-slider>
</ng-container>

<ng-container  *ngIf="type === 'featuredImg'">
  <ng-swipe-featured-img
  [state]="galleryStore.state | async"
  [config]="galleryStore.config | async">
</ng-swipe-featured-img> 
</ng-container>


  `,
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {

  @Input() images: [];
  @Input() id: string;
  @Input() dir: string;
  @Input() config: galleryConfig;
  galleryStore: SwipeStore;
  type : galleryConfig['type'];
  constructor(
    private biDir: Directionality,
    private _gallery: ConfigService,
    private responsive: BreakpointsService,
) {}

  ngOnInit(): void {
    this.config ? this.config : (this.config = this._gallery.config);

      // get Slider ref
      this.galleryStore = this._gallery.ref(this.id, this.config);
      
      this.galleryStore.setConfig(this.config, defaultGallery);
      // set Items
      this.galleryStore.loadItems(this.images);

      this.galleryStore.setActive(this.config.initialItem)

      // set Layout Direction
      this.dir
        ? this.galleryStore.layoutDir(this.dir)
        : this.galleryStore.layoutDir(this.biDir.value);

      // set gallery type
      this.type = this.config.type;
 
    // Check If Breakpoints options
    // this.config.breakpoints !== undefined
    // ? (this.responsive.responsiveConfig(this.config, this.galleryStore, defaultConfig))
    // : null;
     
    
  }

  ngAfterViewChecked(){
 
  }


onEvent(i) {
  if (i === "next") {
    this.galleryStore.next();
  } else if (i === "prev") {
    this.galleryStore.prev();
  } else {
    this.galleryStore.setActive(<number>i);
  }
}
  ngOnDestroy() {
    this.galleryStore.destroy();
  }

}
