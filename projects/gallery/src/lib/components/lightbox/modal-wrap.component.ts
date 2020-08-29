import { Component } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'ng-swipe-modal-wrap',
  template: '<ng-swipe-lightbox></ng-swipe-lightbox>',
  styles: []
})
export class ModalWrapComponent{
  constructor(private lightboxService: LightboxService) {}
}
