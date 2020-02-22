import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";
import { SelectionContext } from "./SelectionGroup";

import * as style from "./styles/Selection.css";

export interface SelectionConfig extends Base {
  /**
   * Type of the selection.
   * Radio can only be selected one at a time
   * Checkbox and switch are skinned checkboxes
   */
  type: "radio" | "checkbox" | "switch";
  /**
   * name prop for form usage
   */
  name?: string;
  /**
   * value prop for form usage
   */
  value?: string;
  /**
   * Initial checked state
   */
  checked?: boolean;
  /**
   * Label text next to selection
   */
  label?: string;
  /**
   * onChange event to be passed to the target
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * function called when checked state is changed
   */
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e);
  };
  if (props.onChangeValue) {
    React.useEffect(() => {
      props.onChangeValue(checked);
    }, [checked]);
  }

  let onClick = () => {
    setChecked(!checked);
  };
  const selCtx = React.useContext(SelectionContext);

  if (props.type === "radio") {
    const onRadioChange = () => {
      setChecked(false);
    };
    onRadioChange.bind(checked);
    if (curr === -1) {
      selCtx.changers.push(onRadioChange);
      setCurr(selCtx.changers.length - 1);
    }

    onClick = () => {
      setChecked(true);
      selCtx.onChange(curr);
    };
    onClick.bind(checked);
  }

  const theme = React.useContext(CTX);
  React.useEffect(() => {
    applyTheme(theme, ref);
  }, []);

  const render = () => {
    const check = () => (checked ? style.checked : style.unchecked);
    let cl = "";
    switch (props.type) {
      case "radio":
        cl = style.radio;
        break;
      case "checkbox":
        cl = style.checkbox;
        break;
      case "switch":
        cl = style.switch;
        break;
    }
    return (
      <div className={`${check()} ${cl} ${style.select}`}>
        <div></div>
      </div>
    );
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
          onChange={onChange}
        />
      </label>
    </div>
  );
}
