import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/TextField.css";

export interface SelectionConfig extends Base {
  type: "radio" | "checkbox" | "switch";
  value?: string;
  checked?: boolean;
}
export function Selection(props: SelectionConfig): JSX.Element {
  const [checked, setChecked] = React.useState(props.checked),
    ref = React.useRef<HTMLInputElement>();
  let type: string;
  if (props.type === "switch") {
    type = "radio";
  } else {
    type = props.type;
  }

  return (
    <div className={style.root}>
      <input type={type} ref={ref} value={props.value} checked={checked} />
    </div>
  );
}
