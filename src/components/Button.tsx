import * as React from "react";
import { Base, getBaseAttributes } from "./base";
import { CTX } from "../theme";

import styled, { keyframes, css } from "styled-components";
import { Theme } from "..";
import bstyle from "./base.styles";

const Root = styled.button<{ theme: Theme; prop: ButtonConfig }>`
  font-size: 1em;
  width: fit-content;
  outline: 0;
  padding: 0;
  border: 0;
  background-color: transparent;
  height: calc(2em + 30px);
  font-family: ${({ theme }) => theme.fontFamily};
  margin: 0.5em 1em;
  display: ${({ prop }) => {
    if (!prop.type || prop.type === "standard") {
      return "block";
    } else {
      return "inline-block";
    }
  }};
  &::-moz-focus-inner {
    border: 0;
  }
  &:focus {
    outline: 0;
  }
`;
const Container = styled.div`
  overflow: hidden;
  width: min-content;
  height: min-content;
  margin: 0;
  border-radius: ${bstyle.borderRadius};
  position: relative;
  padding: 0;
`;

const ButtonStyled = styled.div<{
  theme: Theme;
  prop: ButtonConfig;
  clicked: boolean;
}>`
  margin: 0;
  cursor: pointer;
  outline: 0;
  width: min-content;
  padding: 0.25em 0.5em;
  border-radius: ${bstyle.borderRadius};

  ${({ theme, prop, clicked }) => {
    switch (prop.type) {
      case "flat":
        return `
          border: ${bstyle.borderSize} solid ${theme.borderColour};
          color: ${theme.borderColour};
          background-color: transparent;
          transition: all 80ms ease-out;
          filter: blur(0);
          ${clicked &&
          `
            filter: blur(.5px);
            transform: scale(0.95);
          `}
          }
        `;
      case "borderless":
        return `
          color: ${theme.borderColour};
          background-color: transparent;
        `;
      default:
        return `
          border-right: ${bstyle.borderSize} solid ${theme.borderColour};
          border-bottom: ${bstyle.borderSize} solid ${theme.borderColour};
          background-color: ${theme.secondaryBackgroundColour};
          color: ${theme.secondaryTextColour};
          transition: all 150ms ease-in-out;
              ${clicked &&
          `
                  border-right: 0 solid ${theme.borderColour};
                  border-bottom: 0 solid ${theme.borderColour};
                  margin-left: ${bstyle.borderSize};
                  margin-top: ${bstyle.borderSize};
                  outline: 0;
                `}
        `;
    }
  }}
`;

const rippleKeys = keyframes`
    100% {
      transform: scale(40);
      opacity: 0;
    }
  `;

const rippleAnim = css`
    animation ${rippleKeys} 0.5s linear;
`;
let Ripple = styled.div<{ active: boolean; props: ButtonConfig; theme: Theme }>`
  width: 5px;
  height: 5px;
  border-radius: 1000px;
  transform: scale(0);
  opacity: 1;
  position: absolute;
  z-index: 100;
  cursor: pointer;
  ${({ active }) => active && rippleAnim}
  background-color: ${({ props, theme }) => {
    if (!props.type || props.type === "standard") {
      return theme.buttonRipple;
    } else {
      return theme.buttonDarkRipple;
    }
  }}
`;

export interface ButtonConfig extends Base<HTMLButtonElement> {
  /**
   * Type of the button.
   * Standard is a 3d effect block element
   * Flat is a bordered modern button
   * Borderless is exclusively a ripple element
   */
  type?: "standard" | "flat" | "borderless";
}

export default function Button(props: ButtonConfig): React.ReactElement<ButtonConfig> {
  const [ripple, setRipple] = React.useState(false),
    [click, setClick] = React.useState(false),
    [coords, setCoords] = React.useState({ top: 0, left: 0 }),
    ref = React.useRef<HTMLButtonElement>();

  const theme = React.useContext(CTX);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let [x, y] = [e.clientX - rect.left, e.clientY - rect.top];

    setCoords({ top: y, left: x });
    setRipple(true);
    setClick(true);
    setTimeout(() => {
      setRipple(false);
    }, 500);
    setTimeout(() => {
      setClick(false);
    }, 200);

    // Passthrough event to user defined onClick
    if (props.onClick) props.onClick(e);
  };

  return (
    <div
      style={{
        display:
          !props.type || props.type === "standard" ? "block" : "inline-block"
      }}
    >
      <Root
        {...getBaseAttributes(props)}
        theme={theme}
        prop={props}
        ref={ref}
        style={props.style}
        onClick={onClick}
      >
        <Container>
          <ButtonStyled clicked={click} prop={props} theme={theme}>
            {props.children}
          </ButtonStyled>
          <Ripple props={props} theme={theme} active={ripple} style={coords} />
        </Container>
      </Root>
    </div>
  );
}
