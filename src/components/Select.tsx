import * as React from "react";
import { Base } from "./base";
import { CTX } from "../theme";

import styled, { keyframes, css } from "styled-components";
import bstyle from "./base.styles";
import { Theme } from "../theme";

type OptionElement = React.DetailedReactHTMLElement<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;

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
const Input = styled.select<{ theme: Theme; custom: boolean }>`
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
  cursor: pointer;
  float:left;
  ${({ custom }) => custom && `
    & option {
      display: none;
    }
  `}
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

const animIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.01);
    margin-top: .2em;
  }
  to {
    opacity 1;
    transform: scale(1);
    margin-top: 0;
  }
`;
const animInCss = css`
  animation: ${animIn} .2s ease-in-out;
`;
const OptionsSelect = styled.div<{ theme: Theme, open: boolean }>`
  position: fixed;
  background-color: ${({ theme }) => theme.accentColour}f0;
  border-radius: ${bstyle.borderRadius};
  cursor: pointer;
  ${animInCss};
  padding: 0;
  overflow: hidden;
  & option {
    padding: .5em 1em;
    color: ${({ theme }) => theme.secondaryTextColour};
    transition: all .2s;
  }
  & option:hover {
    background-color: ${({ theme }) => theme.secondaryBackgroundColour}
  }
  z-index: 1000;
`;

interface OptionProps {
  theme: Theme;
  clicked: boolean;
  coords: { x: number; y: number; width: number };
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  options: Array<OptionElement>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
function Options(props: OptionProps): JSX.Element | null {
  const onClick = (o: number) => (e: React.MouseEvent<HTMLOptionElement>) => {
    console.log(o);
    props.setIndex(o);
    props.setClicked(false);
  }
  let options: Array<OptionElement> = [];
  for (let o in props.options) {
    let opt = React.cloneElement(props.options[o], {
      className: +o === props.index ? "selected" : "", onClick: onClick(+o).bind(+o)
    });
    options.push(opt);
  }
  if (props.clicked) {
    return <OptionsSelect
      style={{ top: props.coords.y, left: props.coords.x, width: props.coords.width }}
      theme={props.theme}
      open={props.clicked}
      onMouseLeave={() => props.setClicked(false)}
    >{options}</OptionsSelect>
  } else {
    return null;
  }
}

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
   * If the select element should be native
   */
  native?: boolean;
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
    [clicked, setClicked] = React.useState(false),
    [coords, setCoords] = React.useState({ x: 0, y: 0, width: 0 }),
    [selectValue, setSelectValue] = React.useState(
      (props.emptyEntry ?? true) ? -1 : props.options[0].value),
    [options, setOptions] = React.useState<Array<OptionElement>>([]),
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
    setValue(e.currentTarget.selectedIndex);
    if (onChangeText) onChangeText(e.currentTarget.value);
    if (props.onChange) props.onChange(e);
  };

  React.useEffect(() => {
    if (options.length > value) {
      const opt = options[value].props.value
      if (typeof (opt) === "number")
        setSelectValue(opt.toString());
      else if (typeof (opt) === "string")
        setSelectValue(opt);
    }
  }, [value]);

  const theme = React.useContext(CTX);

  React.useEffect(() => {
    let opts: Array<OptionElement> = [];
    if (props.emptyEntry ?? true) {
      opts = [<option value={-1} key={-1}></option> as OptionElement];
    }
    for (let element of props.options) {
      opts.push(<option key={element.value} value={element.value}>{element.name}</option> as OptionElement);
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
          custom={!props.native}
          theme={theme}
          onChange={onChange}
          onMouseDown={!props.native ? e => {
            const rect = e.currentTarget.getBoundingClientRect();
            let [x, y] = [rect.left, rect.top];
            setCoords({ x, y, width: e.currentTarget.offsetWidth });
            setClicked(true);
            e.stopPropagation();
            e.preventDefault();
          } : () => { }}
          value={selectValue}
        >
          {options}
        </Input>
        {!props.native && <Options
          setClicked={setClicked}
          coords={coords}
          theme={theme}
          clicked={clicked}
          options={options}
          index={value}
          setIndex={setValue}
        />}
      </div>
    </Root>
  );
}
