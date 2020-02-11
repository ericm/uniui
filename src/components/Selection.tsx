import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/TextField.css";

export interface SelectionConfig extends Base {
  type: "radio" | "checkbox" | "switch";
}
export function Selection(props: SelectionConfig): JSX.Element {
  let type: string;
  if (props.type === "switch") {
    type = "radio";
  } else {
    type = props.type;
  }

  return (
    <div className={style.root}>
      <input type={type} />
    </div>
  );
}
