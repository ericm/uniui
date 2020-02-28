import * as React from "react";
import { Base } from "./base";
import { CTX } from "../theme";

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
const Input = styled.input<{ theme: Theme }>`
  border: ${bstyle.borderSize};
  display: block;
  border-bottom: ${bstyle.borderSize} solid ${({ theme }) => theme.borderColour};
  color: ${({ theme }) => theme.textColour};
  background: transparent;
  position: absolute;
  bottom: 0;
  width: 12em;
  font-size: 1em;
  transition: all 80ms ease-in-out;
  padding-left: 0.2em;
  &:focus {
    outline: none;
    background: ${bstyle.inputBack};
  }
  &::selection {
    background: ${({ theme }) => theme.secondaryBackgroundColour};
    color: ${({ theme }) => theme.backgroundColour};
  }
`;

const Sub = styled.span<{ theme: Theme; state: boolean }>`
  position: relative;
  display: block;
  color: ${({ theme }) => theme.borderColour};
  font-size: 0.5em;
  transition: all 80ms ease-in-out;
  top: 0;
  padding-left: 0.2em;
  ${({ state }) =>
    state &&
    `
      font-size: 1em;
      top: 0.5em;
  `}
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
   * Type prop passed to input
   */
  type?: "text" | "search" | "password" | "number";
  /**
   * onChange event on the target
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Called when the value of the input text changes
   */
  onChangeText?: (s: string) => void;
}
export default function (props: InputConfig): JSX.Element {
  const [value, setValue] = React.useState(props.value ?? ""),
    [subState, setSubState] = React.useState(false),
    onChangeText = props.onChangeText,
    ref = React.useRef<HTMLDivElement>();

  const setSub = () => {
    if (value.length > 0 && subState) {
      setSubState(false);
    } else if (value.length === 0 && !subState) {
      setSubState(true);
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

  return (
    <Root theme={theme} style={props.style}>
      {(() =>
        props.subtitle ? (
          <Sub state={subState} theme={theme}>
            {props.subtitle}
          </Sub>
        ) : null)()}
      <div>
        <Input type={props.type ?? "text"} theme={theme} onChange={onChange} value={value} />
      </div>
    </Root>
  );
}
