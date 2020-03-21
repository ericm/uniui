import * as React from "react";
import { Base } from "./base";
export interface SelectMap {
  changers: (() => void)[];
  onChange: (i: number) => void;
}

const newMap = (): SelectMap => {
  const map = {
    changers: [],
    onChange: (curr: number) => {
      map.changers.forEach((handle, i) => {
        if (i !== curr) handle();
      });
    }
  };
  return map;
};
const ctx = React.createContext(newMap());

export default function(props: Base) {
  return <ctx.Provider value={newMap()}>{props.children}</ctx.Provider>;
}

export { ctx as SelectionContext };
