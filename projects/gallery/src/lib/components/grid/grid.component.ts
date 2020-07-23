import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';
import { config } from 'rxjs';
@Component({
  selector: 'ng-swipe-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() state;
  @Input() config;
  @Output() event = new EventEmitter<string | number>();
  constructor( private lightbox: LightboxService) { }

  ngOnInit(): void {
    console.log('G.Comp,', this.config);
    console.log('G State,', this.state);
  }
  onClick(i) {
    this.lightbox.loadItems(this.state.items);
    this.lightbox.setConfig(this.config)
    this.event.emit(i);

    this.lightbox.open();
    this.lightbox.setActive(i);
  }

}
