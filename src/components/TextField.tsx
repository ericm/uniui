import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/TextField.css";
import styled from "styled-components";
import bstyle from "./base.styles";
import { Theme } from "..";

const Root = styled.div<{ theme: Theme }>`
  margin: 0.5em 1em;
  padding: 0;
  font-size: 1em;
  height: 2em;
  position: relative;
  width: auto;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fontFamily};
`;
export interface InputConfig extends Base {
  /**
   * Value of the input field
   */
  value?: string;
  /**
   * Title of the field
   */
  subtitle?: string;
  /**
   * onChange event on the target
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Called when the value of the input text changes
   */
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
      <div className={style.wrapper}>
        <input onChange={onChange} value={value}></input>
      </div>
    </div>
  );
}
