import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/Input.css";

export interface InputConfig extends Base {}
export default function Input(props: InputConfig) {
  return <input className={style.root} style={props.style}></input>;
}
