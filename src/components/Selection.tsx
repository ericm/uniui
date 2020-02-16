import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/Selection.css";

export interface SelectionConfig extends Base {
  type: "radio" | "checkbox" | "switch";
  value?: string;
  checked?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (state: boolean) => void;
}
export function Selection(props: SelectionConfig): JSX.Element {
  const [checked, setChecked] = React.useState(props.checked ?? false),
    ref = React.useRef<HTMLInputElement>();
  let type: string;
  if (props.type === "switch") {
    type = "radio";
  } else {
    type = props.type;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked !== checked) {
      setChecked(e.currentTarget.checked);
      props.onChange(e);
      props.onChangeValue(checked);
    }
  };

  const render = () => {
    switch (props.type) {
    }
  };

  return (
    <div className={style.root}>
      <label>
        {(() => (props.label ? <span>{props.label}</span> : null))()}
        {render()}
      </label>
      <input
        onChange={onChange}
        style={props.style && { display: "none" }}
        type={type}
        ref={ref}
        value={props.value}
        checked={checked}
      />
    </div>
  );
}
