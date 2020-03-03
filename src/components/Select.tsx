import * as React from "react";
import { Base } from "./base";
import { CTX } from "../theme";

import { cloneDeep } from "lodash";
import styled, { keyframes, css, StyledComponent } from "styled-components";
import bstyle from "./base.styles";
import { Theme } from "../theme";

type OptionElement = React.DetailedReactHTMLElement<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

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
  touch-action: none;
  border: ${bstyle.borderSize};
  display: inline-block;
  -webkit-appearance: none;
  border-bottom: ${bstyle.borderSize} solid ${({ theme }) => theme.borderColour};
  color: ${({ theme }) => theme.textColour};
  background: transparent;
  position: absolute;
  bottom: 0;
  width: 10em;
  font-size: 1em;
  padding-left: 0.2em;
  cursor: pointer;
  float: left;
  ${({ custom }) =>
    custom &&
    `
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
  animation: ${animIn} 0.2s ease-in-out;
`;
const OptionsSelect = styled.div<{ theme: Theme; open: boolean }>`
  outline: 0;
  position: fixed;
  background-color: ${({ theme }) => theme.accentColour}f0;
  border-radius: ${bstyle.borderRadius};
  cursor: pointer;
  ${animInCss};
  padding: 0;
  overflow: hidden;
  & option {
    padding: 0.5em 1em;
    color: ${({ theme }) => theme.secondaryTextColour};
    transition: all 0.2s;
  }
  & .selected {
    color: ${({ theme }) => theme.secondaryBackgroundColour};
    text-shadow: 0 0 10px #0000008c;
  }
  & .selected:hover {
    color: ${({ theme }) => theme.secondaryTextColour};
  }
  & option:hover {
    background-color: ${({ theme }) => theme.secondaryBackgroundColour};
  }
  & .highlighted {
    background-color: ${({ theme }) => theme.borderColour} !important;
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
  const onClick = <T extends React.SyntheticEvent<HTMLOptionElement>>(
    o: number
  ) => (e: T) => {
    if (o !== -1) props.setIndex(o);
    props.setClicked(false);
  };
  const ref = React.useRef<HTMLDivElement>(null);

  let options_collect: Array<OptionElement> = [];
  for (let o in props.options) {
    let opt = React.cloneElement(props.options[o], {
      className: +o === props.index ? "selected" : "",
      onClick: onClick(+o).bind(+o)
    });
    options_collect.push(opt);
  }
  const [options, setOptions] = React.useState<Array<OptionElement>>([]),
    [optionIndex, setOptionIndex] = React.useState(-1);
  React.useEffect(() => {
    setOptions(options_collect);
    if (!props.clicked) {
      setOptionIndex(-1);
    }
  }, [props]);
  React.useEffect(() => {
    let opts = cloneDeep(options);
    for (let o in opts) {
      if (+o === optionIndex) {
        opts[o].props.className += " highlighted";
      } else if (opts[o].props.className === " highlighted") {
        opts[o].props.className = "";
      } else if (opts[o].props.className === "selected highlighted") {
        opts[o].props.className = "selected";
      }
    }
    setOptions(opts);
  }, [optionIndex]);
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => props.setClicked(false));
  }
  React.useLayoutEffect(() => {
    if (ref.current && typeof window !== "undefined") {
      if (ref.current.clientHeight > window.innerHeight - props.coords.y) {
        ref.current.style.top = `${props.coords.y +
          20 -
          ref.current.clientHeight}px`;
      }
    }
  });
  const eventHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        if (optionIndex + 1 < options.length) {
          // Move forward
          setOptionIndex(optionIndex + 1);
        } else if (optionIndex === -1) {
          setOptionIndex(0);
        } else {
          setOptionIndex(-1);
        }
        break;
      case "ArrowUp":
        if (optionIndex > 0) {
          setOptionIndex(optionIndex - 1);
        } else if (optionIndex === -1) {
          setOptionIndex(0);
        } else {
          setOptionIndex(options.length - 1);
        }
        break;
      case "Enter":
        if (optionIndex >= 0 && optionIndex < options.length) {
          props.setIndex(optionIndex);
          props.setClicked(false);
        }
        return;
      default:
        // Jumps to letter on type
        for (let o in options) {
          let key = options[o].key.toString();
          if (key.length > 0 && key[0].toLowerCase() === e.key.toLowerCase()) {
            setOptionIndex(+o);
            return;
          }
        }
        setOptionIndex(-1);
    }
    e.stopPropagation();
    e.preventDefault();
  };
  React.useEffect(() => {
    if (typeof window !== "undefined" && props.clicked) {
      window.addEventListener("keydown", eventHandler, { once: true });
    }
  }, [props, optionIndex]);
  if (props.clicked) {
    return (
      <OptionsSelect
        tabIndex={0}
        ref={ref}
        style={{
          top: props.coords.y,
          left: props.coords.x,
          width: props.coords.width
        }}
        theme={props.theme}
        open={props.clicked}
        onMouseLeave={() => props.setClicked(false)}
      >
        {options}
      </OptionsSelect>
    );
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
  options: [Option];
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
export default function(props: SelectConfig): JSX.Element {
  const [value, setValue] = React.useState(props.selectedIndex ?? 0),
    [subState, setSubState] = React.useState(true),
    [clicked, setClicked] = React.useState(false),
    [coords, setCoords] = React.useState({ x: 0, y: 0, width: 0 }),
    [selectValue, setSelectValue] = React.useState(
      props.emptyEntry ?? true ? -1 : props.options[0].value
    ),
    [options, setOptions] = React.useState<Array<OptionElement>>([]),
    onChangeText = props.onChangeText;

  let setSub = () => {};
  if (options.length > 0 && options[0].props.value === -1) {
    setSub = () => {
      if (value > 0) {
        setSubState(false);
      } else if (value === 0) {
        setSubState(true);
      }
    };
  } else if (options.length > 0) {
    setSub = () => setSubState(false);
    if (subState) setSubState(false);
  }
  React.useEffect(setSub, [value]);
  React.useEffect(setSub, []);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.currentTarget.selectedIndex);
    if (onChangeText) onChangeText(e.currentTarget.value);
    if (props.onChange) props.onChange(e);
  };

  React.useEffect(() => {
    if (options.length > value) {
      const opt = options[value].props.value;
      if (typeof opt === "number") setSelectValue(opt.toString());
      else if (typeof opt === "string") setSelectValue(opt);
    }
  }, [value]);

  const theme = React.useContext(CTX);

  React.useEffect(() => {
    let opts: Array<OptionElement> = [];
    if (props.emptyEntry ?? true) {
      opts = [(<option value={-1} key={-1}></option>) as OptionElement];
    }
    for (let element of props.options) {
      opts.push(
        (
          <option key={element.name} value={element.value}>
            {element.name}
          </option>
        ) as OptionElement
      );
    }
    setOptions(opts);
  }, []);

  const activateEvent = () =>
    !props.native
      ? (
          e:
            | React.MouseEvent<HTMLSelectElement>
            | React.TouchEvent<HTMLSelectElement>
        ) => {
          const rect = e.currentTarget.getBoundingClientRect();
          let [x, y] = [rect.left, rect.top];
          setCoords({ x, y, width: e.currentTarget.offsetWidth });
          setClicked(true);
          try {
            e.stopPropagation();
            e.preventDefault();
          } catch (error) {
            console.log(error);
          }
        }
      : () => {};

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
          onMouseDown={activateEvent()}
          onTouchEnd={activateEvent()}
          value={selectValue}
        >
          {options}
        </Input>
        {!props.native && (
          <Options
            setClicked={setClicked}
            coords={coords}
            theme={theme}
            clicked={clicked}
            options={options}
            index={value}
            setIndex={setValue}
          />
        )}
      </div>
    </Root>
  );
}
