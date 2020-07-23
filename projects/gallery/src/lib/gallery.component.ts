import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation
} from "@angular/core";
import { Directionality } from "@angular/cdk/bidi";
import { BreakpointsService } from "core";
import { galleryConfig } from "./models/config.model";
import { ConfigService } from "./services/config.service";
import { defaultGallery } from "./utils/gallery.config";
import { LightboxService } from './services/lightbox.service';

@Component({
  selector: 'ng-swipe-gallery',
  template: `
  <ng-container  *ngIf="type === 'grid'">
  <ng-swipe-grid
     
  [state]="galleryStore.state | async"
  [config]="galleryStore.config | async"
  (event)="onEvent($event)"
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
  [config]="galleryStore.config | async"
  (event)="onEvent($event)">
</ng-swipe-featured-img> 
</ng-container>


  `,
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent implements OnInit {

  @Input() images: Array<string>;
  @Input() id: string;
  @Input() dir: string;
  @Input() config: galleryConfig;
  galleryStore;
  type;
  constructor(
    private biDir: Directionality,
    private _gallery: ConfigService,
    private responsive: BreakpointsService,
) {}

  ngOnInit(): void {
    this.config ? this.config : (this.config = this._gallery.config);

      // get Slider ref
      this.galleryStore = this._gallery.ref(this.id, this.config);
      // set Items
      this.galleryStore.loadItems(this.images);
 
      
      // set Layout Direction
      this.dir
        ? this.galleryStore.layoutDir(this.dir)
        : this.galleryStore.layoutDir(this.biDir.value);

      // set config
  
      this.type = this.config.type;


      // Check If Breakpoints options
      this.config.breakpoints !== undefined
      ? (this.responsive.responsiveConfig(this.config, this.galleryStore))
      : null;
    
  }

  onEvent(i: any) {
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
