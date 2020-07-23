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

    responsiveConfig(config, store, def?): void {
  
    let userBreakpoints = [];
    for (let i in config.breakpoints) {
      userBreakpoints.push(Breakpoints[i]);
    }
    this.breakpointObserve
      .observe(userBreakpoints)
      .subscribe((res: BreakpointState) => {
        // breakpointObserve return false between 600px and 650px on Resize
        if (res.matches) {
          let options = config;
          const matchedValue = Object.keys(res.breakpoints).find(
            e => res.breakpoints[e] === true
          );
          const matchedBreakpoint = Object.keys(Breakpoints).find(
            e => Breakpoints[e] === matchedValue
          );
          const breakpoint = config.breakpoints[matchedBreakpoint];
        for (const property in breakpoint) {
            if ( typeof breakpoint[property] === 'object' ) {
              options[property] = {...options[property], ...breakpoint[property]}
              store.setConfig({...config, ...options})
            } else {
              store.setConfig({...config, ...breakpoint})
            } 
        }
     
        } else {
          store.setConfig(config);      
        }
      });
  }
}
