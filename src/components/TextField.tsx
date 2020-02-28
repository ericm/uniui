import * as React from "react";
import { Base } from "./base";
import { CTX } from "../theme";

import styled from "styled-components";
import bstyle from "./base.styles";
import view from "./svg/view_password.svg";
import noview from "./svg/no_view_password.svg";
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
const Input = styled.input<{ theme: Theme; change: boolean }>`
  border: ${bstyle.borderSize};
  display: inline-block;
  border-bottom: ${bstyle.borderSize} solid ${({ theme }) => theme.borderColour};
  color: ${({ theme }) => theme.textColour};
  background: transparent;
  position: absolute;
  bottom: 0;
  ${({ change }) => change && `
    width: 10em;
    padding-right: 2.3em;
  `}
  font-size: 1em;
  padding-left: 0.2em;
  float:left;
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

const PasswordView = styled.img`
  display: inline-block;
  height: auto;
  width: 2em;
  position: absolute;
  top: .9em;
  cursor: pointer;
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
    [type, setType] = React.useState(props.type ?? "text"),
    onChangeText = props.onChangeText;

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

        <Input
          change={props.type === "password" && value.length > 0}
          type={type}
          theme={theme}
          onChange={onChange}
          value={value} />
        {props.type === "password" && value.length > 0 &&
          <PasswordView
            style={{ left: `10em` }}
            src={(type === "password" && view) || type === "text" && noview}
            onClick={() => setType(type === "password" ? "text" : "password")} />}

      </div>
    </Root>
  );
}
