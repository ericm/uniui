import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/TextField.css";

export interface InputConfig extends Base {
  value?: string;
  subtitle?: string;
}
export default function Input(props: InputConfig): JSX.Element {
  return (
    <div className={style.root}>
      {(() =>
        props.subtitle ? (
          <span className={style.sub}>{props.subtitle}</span>
        ) : null)()}
      <span>{props.subtitle}</span>
      <input value={props.value} style={props.style}></input>
    </div>
  );
}
