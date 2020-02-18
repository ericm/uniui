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
      setChecked(false);
      console.log(props.label, false);
    };
    onRadioChange.bind(checked);
    if (curr === -1) {
      selCtx.changers.push(onRadioChange);
      setCurr(selCtx.changers.length - 1);
    }

    onClick = () => {
      setChecked(true);
      selCtx.onChange(curr);
      console.log(props.label, true);
    };
    onClick.bind(checked);
  }

  const theme = React.useContext(CTX);
  React.useEffect(() => {
    applyTheme(theme, ref);
  }, []);

  const render = () => {
    const check = () => (checked ? style.checked : style.unchecked);
    switch (props.type) {
      case "radio":
        return (
          <div className={`${check()} ${style.radio} ${style.select}`}>
            <div></div>
          </div>
        );
      case "checkbox":
        return (
          <div className={`${check()} ${style.checkbox} ${style.select}`}>
            <div></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={style.root} ref={ref}>
      <label>
        {render()}
        {(() => (props.label ? <span>{props.label}</span> : null))()}
        <input
          name={name}
          onClick={onClick}
          style={props.style}
          type={type}
          value={props.value}
        />
      </label>
    </div>
  );
}
