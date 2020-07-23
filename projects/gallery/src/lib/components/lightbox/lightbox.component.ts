import {
  Component,
  OnInit,
  HostListener,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { LightboxService } from "../../services/lightbox.service";
import { defaultGallery } from "../../utils/gallery.config";
import { BreakpointsService } from "core";
import { Subscription, Observable, from } from "rxjs";

@Component({
  selector: "ng-swipe-lightbox",
  templateUrl: "./lightbox.component.html",
  styleUrls: ["./lightbox.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxComponent implements OnInit {
  config: any;
  state;
  private subscription = new Subscription();
  active: any;
  title: string;
  busy: Observable<boolean>;
  resize: boolean;
  width: any;
  store: LightboxService;
  id: string = 'lbx';
  readonly _instances = new Map<string, LightboxService>();
  @ViewChild("wrap", { static: true }) wrapper: ElementRef;

  constructor(
    public lightbox: LightboxService,
    private responsive: BreakpointsService
  ) {}

  @HostListener("window: keyup", ["$event"]) close(e) {
    e.key === "Escape" ? this.lightbox.close() : null;
  }

  onTap(): void {
    this.lightbox.close();

  }

  onEvent(i: any) {
    if (i === "next") {
      this.lightbox.next();
    } else if (i === "prev") {
      this.lightbox.prev();
    } else {
      this.lightbox.setActive(<number>i);
    }
  }

  ngOnInit() { 
    this.width = this.wrapper.nativeElement.offsetWidth;
 

    this.subscription.add(this.lightbox.state.subscribe(
      e => this.state = e)
      );

    this.subscription.add(
      this.lightbox.config.subscribe(e => (this.config = e) 
      )
    );

    this.store = this._instances.set(this.id, new LightboxService()).get(this.id);

    this.config.breakpoints !== undefined
      ? (this.responsive.responsiveConfig(this.config, this.store))
      : null;
  }

  onResize($event): void {
    this.width = this.wrapper.nativeElement.offsetWidth;
    this.resize = true;
  }

  private deleteInstance(id: string) {
    return () => {
  
        this._instances.delete(id);

    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.deleteInstance(this.id);
    this.lightbox.destroy()
  }
}
