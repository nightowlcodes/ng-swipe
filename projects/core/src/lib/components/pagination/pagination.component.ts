import { Component, Input, Output, EventEmitter } from "@angular/core";
import { SwipeState } from "../../models/slider.model";
import {SliderConfig} from "../../models/config.model"

@Component({
  selector: "ng-swipe-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent {
  @Input() state: SwipeState;
  @Input() config: SliderConfig;

  @Output() event = new EventEmitter<number>();

}