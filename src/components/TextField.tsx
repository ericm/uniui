import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/TextField.css";

export interface InputConfig extends Base {
  value?: string;
}
export default function Input(props: InputConfig) {
  return (
    <div className={style.root}>
      <input value={props.value} style={props.style}></input>
    </div>
  );
}
