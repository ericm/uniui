import * as React from "react";
import { Base } from "./base";
import { CTX } from "../theme";

import styled, {
  keyframes,
  withTheme,
  ThemedStyledFunction
} from "styled-components";

export interface ButtonConfig extends Base {
  /**
   * Type of the button.
   * Standard is a 3d effect block element
   * Flat is a bordered modern button
   * Borderless is exclusively a ripple element
   */
  type?: "standard" | "flat" | "borderless";
}

export default function Button(props: ButtonConfig): React.ReactElement {
  const [ripple, setRipple] = React.useState(false),
    [coords, setCoords] = React.useState({ top: 0, left: 0 }),
    ref = React.useRef<HTMLButtonElement>();

  const theme = React.useContext(CTX);

  const onClick = (e: React.MouseEvent) => {
    if (ref?.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      let [x, y] = [e.clientX - rect.left, e.clientY - rect.top];

      setCoords({ top: y, left: x });
    }
    setRipple(true);
    setTimeout(() => setRipple(false), 500);

    // Passthrough event to user defined onClick
    if (props.onClick) props.onClick(e);
  };

  const Root = styled.button`
    font-size: 1em;
    width: fit-content;
    outline: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    height: calc(2em + 30px);
    font-family: ${theme.fontFamily};
    margin: 0.5em 1em;
    display: ${!props.type || props.type === "standard"
      ? "block"
      : "inline-block"};
    &::-moz-focus-inner {
      border: 0;
    }
    &:focus {
      outline: 0;
    }
    &:active {
      border-right: 0 solid ${theme.borderColour};
      border-bottom: 0 solid ${theme.borderColour};
      margin-left: var(--border-size);
      margin-top: var(--border-size);
      outline: 0;
    }
  `;
  const Container = styled.div`
    overflow: hidden;
    width: min-content;
    height: min-content;
    margin: 0;
    border-radius: var(--border-radius);
    position: relative;
    padding: 0;
  `;
  let ButtonStyled = styled.div`
    margin: 0;
    cursor: pointer;
    outline: 0;
    width: min-content;
    padding: 0.25em 0.5em;
    border-radius: var(--border-radius);
  `;
  switch (props.type) {
    case "flat":
      ButtonStyled = styled(ButtonStyled)`
        border: var(--border-size) solid ${theme.borderColour};
        color: ${theme.borderColour};
        background-color: transparent;
        transition: all 80ms ease-out;
        &:active {
          filter: blur(1px);
          transform: scale(0.95);
        }
      `;
      break;
    case "borderless":
      ButtonStyled = styled(ButtonStyled)`
        color: ${theme.borderColour};
        background-color: transparent;
      `;
      break;
    default:
      ButtonStyled = styled(ButtonStyled)`
        border-right: var(--border-size) solid ${theme.borderColour};
        border-bottom: var(--border-size) solid ${theme.borderColour};
        background-color: ${theme.secondaryBackgroundColour};
        color: ${theme.secondaryTextColour};
        transition: all 150ms ease-in-out;
        &:active {
          border-right: 0 solid ${theme.borderColour};
          border-bottom: 0 solid ${theme.borderColour};
          margin-left: var(--border-size);
          margin-top: var(--border-size);
          outline: 0;
        }
      `;
  }

  const rippleKeys = keyframes`
    100% {
      transform: scale(40);
      opacity: 0;
    }
  `;

  interface ripProps {
    active: boolean;
  }
  let Ripple = styled.div<ripProps>`
    width: 5px;
    height: 5px;
    border-radius: 100%;
    transform: scale(0);
    opacity: 1;
    position: absolute;
    z-index: 100;
    cursor: pointer;
    ${({ active }) =>
      active &&
      `
      animation: ${rippleKeys} 0.5s linear;
    `}
  `;
  if (!props.type || props.type === "standard") {
    Ripple = styled(Ripple)`
      background-color: ${theme.buttonRipple};
    `;
  } else {
    Ripple = styled(Ripple)`
      background-color: ${theme.buttonDarkRipple};
    `;
  }

  return (
    <div
      style={{
        display:
          !props.type || props.type === "standard" ? "block" : "inline-block"
      }}
    >
      <Root ref={ref} style={props.style} onClick={onClick}>
        <Container>
          <ButtonStyled>{props.children}</ButtonStyled>
          <Ripple active={ripple} style={coords} />
        </Container>
      </Root>
    </div>
  );
}
