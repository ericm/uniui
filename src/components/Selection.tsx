import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";
import { SelectionContext } from "./SelectionGroup";

import * as style from "./styles/Selection.css";
import styled, { keyframes, css } from "styled-components";
import { Theme } from "..";

const Root = styled.div<{ theme: Theme }>`
  padding-left: 0.5em;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 2em;
  & * {
    cursor: pointer;
  }
  & input {
    display: none;
  }
  & label {
    color: ${({ theme }) => theme.textColour};
    font-smooth: always;
  }
  & span {
    font-weight: 200;
    font-size: 0.6em;
    display: inline-block;
    position: relative;
    top: -0.3em;
    user-select: none;
  }
`;

const checkAnim = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 0.2em;
  }
`;
const checkAnim2 = keyframes`
  0% {
    height: 0;
  }
  50% {
    height: 0;
    top: 0.15em;
    left: 0;
  }
  100% {
    height: 0.4em;
  }
`;
const checkAnimCss = css`
  &.checkbox div:before {
    animation ${checkAnim} 0.1s linear;
  }
  &.checkbox div:after {
    animation ${checkAnim2} 0.2s linear;
  }
`;
const Select = styled.div<{ theme: Theme; checked: boolean }>`
  vertical-align: middle;
  display: inline-block;
  padding: 0;
  margin-bottom: 0.2em;
  overflow: hidden;
  margin-right: 0.3em;
  &.checkbox {
    border: 0.05em solid ${({ theme }) => theme.borderColour};
    width: 0.4em;
    height: 0.4em;
    border-radius: 0.15em;
  }
  &.checkbox div:before {
    content: "";
    position: relative;
    display: block;
    background-color: ${({ theme }) => theme.secondaryBackgroundColour};
    width: 0.1em;
    height: 0.2em;
    top: 0.18em;
    left: 0.05em;
    transform: rotate(-45deg);
  }
  &.checkbox div:after {
    content: "";
    position: relative;
    display: block;
    background-color: ${({ theme }) => theme.secondaryBackgroundColour};
    width: 0.1em;
    height: 0.4em;
    top: -0.2em;
    left: 0.21em;
    transform: rotate(45deg);
  }
  ${({ checked }) => {
    return checked
      ? checkAnimCss
      : `
  &.checkbox div {
    opacity: 0;
  }
  `;
  }}
`;
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

  const render = () => {
    return (
      <Select theme={theme} checked={checked} className={props.type}>
        <div></div>
      </Select>
    );
  };

  return (
    <Root theme={theme}>
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
    </Root>
  );
}
