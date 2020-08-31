import {
  Component,
  OnInit,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { galleryConfig } from "../../../models/config.model";
import { SwipeState } from "core";
import { Observable, Subscription } from "rxjs";
import { LightboxService } from "../../../services/lightbox.service";

@Component({
  selector: "ng-swipe-lightbox",
  templateUrl: "./lightbox.component.html",
  styleUrls: ["./lightbox.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LightboxComponent implements OnInit {
  busy: Observable<boolean>;
  config: galleryConfig;
  state: SwipeState;
  subscription: Subscription;

  constructor(
    public modal: ModalService,
    private lightboxService: LightboxService
  ) {}

  @HostListener("window: keyup", ["$event"]) close(e) {
    e.key === "Escape" ? this.modal.close() : null;
  }

  onTap(): void {
    this.modal.close();
  }

  onEvent(i: any) {
    if (i === "next") {
      this.lightboxService.setActive(this.state.activeIndex + 1);
    } else if (i === "prev") {
      this.lightboxService.setActive(this.state.activeIndex - 1);
    } else {
      this.lightboxService.setActive(i);
    }
  }

  ngOnInit() {
    this.subscription = this.lightboxService.config.subscribe((e) => {
      this.config = e;
    });

    this.subscription.add(
      this.lightboxService.state.subscribe((e) => {
        this.state = e;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
