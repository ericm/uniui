import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";
import { SelectionContext } from "./SelectionGroup";

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
export default function Selection(props: SelectionConfig): React.ReactElement {
  const [checked, setChecked] = React.useState(props.checked ?? false),
    [curr, setCurr] = React.useState(-1),
    ref = React.useRef<HTMLInputElement>(),
    name = props.name ?? "input" + style.root;
  let type: string;
  if (props.type === "switch") {
    type = "checkbox";
  } else {
    type = props.type;
  }

  let onClick = () => {};
  const selCtx = React.useContext(SelectionContext);
  if (props.type === "radio") {
    const onRadioChange = () => {
      if (checked) setChecked(false);
    };
    if (curr === -1) {
      selCtx.changers.push(onRadioChange);
      setCurr(selCtx.changers.length - 1);
    }

    onClick = () => {
      console.log(props.label, checked);
      selCtx.onChange(curr);
      if (!checked) setChecked(true);
    };
  }

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
          onClick={onClick}
          style={props.style}
          type={type}
          ref={ref}
          value={props.value}
        />
      </label>
    </div>
  );
}
