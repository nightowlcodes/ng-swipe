import { Injectable } from "@angular/core";
import { Overlay, ScrollStrategyOptions } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { BehaviorSubject, Observable } from "rxjs";
import { ModalWrapComponent } from '../components/lightbox/modal-wrap.component';
import { defaultGallery } from '../utils/gallery.config';

@Injectable()
export class ModalService {

  private _busy: BehaviorSubject<boolean>;
  readonly busy: Observable<boolean>;
  modalRef: any;
  constructor(
    
    private overlay?: Overlay,
    private scrollOptions?: ScrollStrategyOptions,
  ) {

    this._busy = new BehaviorSubject(false);
    this.busy = this._busy.asObservable();
  }


  // Open Method
  open(): void {
    this.modalRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.scrollOptions.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      disposeOnNavigation: true
    });
    const component = new ComponentPortal(ModalWrapComponent);
    this.modalRef.attach(component);
    this.modalRef.backdropClick().subscribe(() => this.close());
    this._busy.next(true);
  }

  // Close Method
  close(): void {
    this.modalRef.dispose();
    this._busy.next(false);
  
  }

  


}
