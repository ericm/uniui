import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/Selection.css";

export interface SelectionConfig extends Base {
  type: "radio" | "checkbox" | "switch";
  name?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (state: boolean) => void;
}
export default function Selection(props: SelectionConfig): JSX.Element {
  const [checked, setChecked] = React.useState(props.checked ?? false),
    ref = React.useRef<HTMLInputElement>(),
    name = props.name ?? "input" + style.root;
  let type: string;
  if (props.type === "switch") {
    type = "radio";
  } else {
    type = props.type;
  }

  React.useEffect(() => {
    console.log(props.label, checked);
    if (props.onChangeValue) props.onChangeValue(e.target.checked);
  }, [checked]);

  const render = () => {
    switch (props.type) {
      default:
        return null;
    }
  };

  return (
    <div className={style.root}>
      <label>
        {(() => (props.label ? <span>{props.label}</span> : null))()}
        {render()}
        <input
          name={name}
          onChange={() => setChecked(!checked)}
          style={props.style}
          type={type}
          ref={ref}
          value={props.value}
        />
      </label>
    </div>
  );
}
