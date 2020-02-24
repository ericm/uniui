import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/Button.css";

import styled, { StyledComponent } from "styled-components";

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
  const [ripple, setRipple] = React.useState(style.ripple),
    [coords, setCoords] = React.useState({ top: 0, left: 0 }),
    ref = React.useRef<HTMLButtonElement>();

  const theme = React.useContext(CTX);

  const onClick = (e: React.MouseEvent) => {
    if (ref?.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      let [x, y] = [e.clientX - rect.left, e.clientY - rect.top];

      setCoords({ top: y, left: x });
    }
    setRipple(`${style.rippleAnimation} ${style.ripple}`);
    setTimeout(() => setRipple(style.ripple), 500);

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
    default:
      ButtonStyled = styled(ButtonStyled)`
        border-right: var(--border-size) solid var(--borderColour);
        border-bottom: var(--border-size) solid var(--borderColour);
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

  return (
    <div
      style={{
        display:
          !props.type || props.type === "standard" ? "block" : "inline-block"
      }}
    >
      <Root style={props.style} onClick={onClick}>
        <Container>
          <div className={buttonStyle}>{props.children}</div>
          <div style={coords} className={ripple}></div>
        </Container>
      </Root>
    </div>
  );
}
