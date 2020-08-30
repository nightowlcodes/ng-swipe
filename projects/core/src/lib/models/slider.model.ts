
export interface SwipeState {
  direction?: string;
  activeIndex?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  items?: Array<{source?: string; title?:string}>;
}

