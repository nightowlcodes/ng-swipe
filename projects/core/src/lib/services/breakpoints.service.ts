import { Injectable } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";

@Injectable({
  providedIn: "root"
})
export class BreakpointsService {
  constructor(private breakpointObserve: BreakpointObserver) {}

  responsiveConfig(config, def, store): void {
    let userBreakpoints = [];
    for (let i in config.breakpoints) {
      userBreakpoints.push(Breakpoints[i]);
    }
    this.breakpointObserve
      .observe(userBreakpoints)
      .subscribe((res: BreakpointState) => {
        // breakpointObserve return false between 600px and 650px on Resize
        if (res.matches) {
          const matchedValue = Object.keys(res.breakpoints).find(
            e => res.breakpoints[e] === true
          );
          const breakPoint = Object.keys(Breakpoints).find(
            e => Breakpoints[e] === matchedValue
          );
          store.setConfig(
            { ...config, ...config.breakpoints[breakPoint] },
            def
          );
        } else {
          store.setConfig(config, def);
        }
      });
  }
}
