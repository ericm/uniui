import * as React from "react";
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

export default ctx.Provider;
