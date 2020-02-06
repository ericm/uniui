import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/TextField.css";

export interface InputConfig extends Base {}
export default function Input(props: InputConfig) {
  return (
    <div className={style.root}>
      <input style={props.style}></input>
    </div>
  );
}
