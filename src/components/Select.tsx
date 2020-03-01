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
const Input = styled.select<{ theme: Theme; change: boolean }>`
  border: ${bstyle.borderSize};
  display: inline-block;
  border-bottom: ${bstyle.borderSize} solid ${({ theme }) => theme.borderColour};
  color: ${({ theme }) => theme.textColour};
  background: transparent;
  position: absolute;
  bottom: 0;
  width: 10em;
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

export interface Option {
  name: string;
  value: string | number;
}
export interface SelectConfig extends Base {
  /**
   * Options array 
   */
  options: [Option]
  /**
   * Index of option selected
   */
  selectedIndex?: number;
  /**
   * If there should be an empty entry
   */
  emptyEntry?: boolean;
  /**
   * Title of the field
   */
  subtitle?: string;
  /**
   * onChange event on the target
   */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Called when the value of the input text changes
   */
  onChangeText?: (s: string) => void;
}
export default function (props: SelectConfig): JSX.Element {
  const [value, setValue] = React.useState(props.selectedIndex ?? 0),
    [subState, setSubState] = React.useState(false),
    [optons, setOptions] = React.useState<Array<JSX.Element>>([]),
    onChangeText = props.onChangeText;

  const setSub = () => {
    if (value > 0) {
      setSubState(false);
    } else if (value === 0) {
      setSubState(true);
    }
  };
  React.useEffect(setSub, [value]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.selectedIndex !== value) {
      setValue(e.currentTarget.selectedIndex);
      if (onChangeText) onChangeText(e.currentTarget.value);
    }
    if (props.onChange) props.onChange(e);
  };

  const theme = React.useContext(CTX);
  React.useEffect(() => {
    let opts: Array<JSX.Element> = [];
    if (props.emptyEntry ?? true) {
      opts = [<option key={-1}></option>];
    }
    for (let element of props.options) {
      opts.push(<option key={element.value} value={element.value}>{element.name}</option>);
    }
    setOptions(opts);
  }, [])

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
          change={value > -1}
          theme={theme}
          onChange={onChange}
        >
          {optons}
        </Input>
      </div>
    </Root>
  );
}
