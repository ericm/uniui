import * as React from "react";

export function getBaseAttributes<E extends Element, T extends Base<E>>(obj: T): React.HTMLAttributes<E> {
  let newObj: React.HTMLAttributes<E> = Object.create(obj);
  for (let key of Object.keys(obj)) {
    if (key in newObj) {
      newObj[key] = obj[key]
    }
  }
  return newObj;
}

export interface Base<T = Element> extends React.HTMLAttributes<T> {
  children?: React.ReactNode;
  /**
   * Styles to be passed through to the target
   */
  style?: React.CSSProperties;
}
