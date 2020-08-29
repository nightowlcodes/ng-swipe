import { Injectable } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";

@Injectable({
  providedIn: "root",
})
export class BreakpointsService {
  constructor(private breakpointObserve: BreakpointObserver) {}

  responsiveConfig(config, store, def?): void {
    let userBreakpoints = [];
    // const options = config;
    let ss = config;
    for (let i in config.breakpoints) {
      userBreakpoints.push(Breakpoints[i]);
    }
    this.breakpointObserve
      .observe(userBreakpoints)
      .subscribe((res: BreakpointState) => {
        // breakpointObserve return false between 600px and 650px on Resize
        if (res.matches) {
          const matchedValue = Object.keys(res.breakpoints).find(
            (e) => res.breakpoints[e] === true
          );
          const matchedBreakpoint = Object.keys(Breakpoints).find(
            (e) => Breakpoints[e] === matchedValue
          );

          const breakpoint = config.breakpoints[matchedBreakpoint];
          // check if break
          if ( Object.keys(breakpoint).some((el) => el === "lightboxSlider")) {
            let options = Object.assign({}, config);
            Object.keys(breakpoint).forEach((e) => {
              options[e] = {...config[e], ...breakpoint[e]};
            });
            // Send config
            store.setConfig({ ...options, ...breakpoint }, def);
          } else {
            store.setConfig({ ...config, ...breakpoint }, def);
          }
        } else {
          store.setConfig(config, def);
        }
      });
  }
}
