import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/TextField.css";

export interface InputConfig extends Base {
  value?: string;
  subtitle?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeText?: (s: string) => void;
}
export default function Input(props: InputConfig): JSX.Element {
  const [value, setValue] = React.useState(props.value ?? ""),
    [subState, setSubState] = React.useState(style.sub),
    onChangeText = props.onChangeText,
    ref = React.useRef<HTMLDivElement>();

  const setSub = () => {
    if (value.length > 0 && subState !== style.sub) {
      setSubState(style.sub);
    } else if (value.length === 0 && subState === style.sub) {
      setSubState(`${style.sub} ${style.subFg}`);
    }
  };
  React.useEffect(setSub, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== value) {
      setValue(e.currentTarget.value);
      if (onChangeText) onChangeText(e.currentTarget.value);
    }
    if (props.onChange) props.onChange(e);
  };

  const theme = React.useContext(CTX);
  React.useEffect(() => applyTheme(theme, ref));

  return (
    <div ref={ref} className={style.root} style={props.style}>
      {(() =>
        props.subtitle ? (
          <span className={subState}>{props.subtitle}</span>
        ) : null)()}
      <input onChange={onChange} value={value}></input>
    </div>
  );
}
