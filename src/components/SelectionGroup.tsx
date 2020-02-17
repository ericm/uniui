import * as React from "react";
import { Base } from "./base";
export interface SelectMap {
  refs: React.MutableRefObject<HTMLInputElement>[];
  changers: (() => void)[];
  onChange: () => void;
}

const arr: SelectMap = {
  refs: [],
  changers: [],
  onChange: () => {
    arr.changers.forEach(han => han());
  }
};
const ctx = React.createContext(arr);

export default function(props: Base) {
  return <ctx.Provider value={arr}>{props.children}</ctx.Provider>;
}
