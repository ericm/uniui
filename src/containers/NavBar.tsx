import * as React from "react";
import Button from "../components/Button";
import styled from "styled-components";
import { Base } from "../components/base";
import { Theme, CTX } from "../theme";

const Root = styled.div<{ theme: Theme; position: "relative" | "fixed" }>`
  position: ${({ position }) => position};
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5em 2em;
  ${({ position }) => position === "fixed" && `
    z-index: 1000;
    width: calc(100% - 4em);
  `}
  height: 3em;
  box-shadow: 0px 4px 10px -8px ${({ theme }) => theme.borderColour};
  background-color: ${({ theme }) => theme.backgroundColour};
  & > button {
    padding: 0 1em;
  }
`;
const Flex = styled.div`
  display: flex;
  height: 3em;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`;
export interface NavBarConfig {
  position: "relative" | "fixed";
  children: Array<React.FunctionComponentElement<Base>>;
}
export default function (props: NavBarConfig): JSX.Element {
  const flexChildren: Array<React.FunctionComponentElement<Base>> = [];
  const titleChildren: Array<React.FunctionComponentElement<Base>> = [];
  props.children.forEach(element => {
    let cloned = React.cloneElement(element);
    let children = element.props.children;
    // Add to titleChild if item isnt Button or doesnt contian button
    if (element.type !== Button) {
      if ((Array.isArray(children)
        && !children.find(value => React.isValidElement(value) && value.type === Button))
        ||
        (React.isValidElement(children) && children.type === Button)) {
        flexChildren.push(cloned);
      } else {
        titleChildren.push(cloned);
      }
    } else {
      flexChildren.push(cloned);
    }
    console.log(titleChildren);
  });

  const theme = React.useContext(CTX);

  return (
    <div>
      {props.position === "fixed" &&
        <div style={{ width: "calc(100-4em)", height: "3em", padding: ".5em 2em" }} />}

      <Root position={props.position} theme={theme}>
        <Flex>
          <div style={{ flexGrow: 1 }}>{titleChildren}</div>
          {flexChildren}
        </Flex>
      </Root>
    </div>
  );
}
