import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { SwipeState } from "../../models/slider.model";
import { SliderConfig } from "../../models/config.model";

@Component({
  selector: "ng-swipe-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  @Input() state: SwipeState;
  @Input() config: SliderConfig;
  @Output() event = new EventEmitter<string>();

  prev: any;
  next: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const svgRgx = /<svg/m;
    const fontRgx = /<i/m;

    const svgColor = `<svg fill="${this.config.accentColor}" `;
    const fontColor = `<i style="color:${this.config.accentColor}" `;

    const leftIcon = svgRgx.test(this.config.leftIcon)
      ? this.config.leftIcon.replace(svgRgx, svgColor)
      : this.config.leftIcon.replace(fontRgx, fontColor);

    const rightIcon = svgRgx.test(this.config.rightIcon)
      ? this.config.rightIcon.replace(svgRgx, svgColor)
      : this.config.rightIcon.replace(fontRgx, fontColor);

    this.Icons(leftIcon, rightIcon);
  }

  Icons(left, right) {
    this.state.direction === "ltr"
      ? ((this.prev = this.sanitizer.bypassSecurityTrustHtml(left)),
        (this.next = this.sanitizer.bypassSecurityTrustHtml(right)))
      : ((this.next = this.sanitizer.bypassSecurityTrustHtml(left)),
        (this.prev = this.sanitizer.bypassSecurityTrustHtml(right)));
  }
}
