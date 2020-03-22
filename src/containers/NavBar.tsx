import * as React from "react";

import styled from "styled-components";
import { Menu } from "react-feather";
import Button from "../components/Button";
import { Base } from "../components/base";
import { Theme, CTX } from "../theme";

const Root = styled.div<{ theme: Theme; position: "relative" | "fixed" }>`
  position: ${({ position }) => position};
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5em 2em;
  ${({ position }) =>
    position === "fixed" &&
    `
    z-index: 1000;
    width: calc(100% - 4em);
  `}
  min-height: 3em;
  box-shadow: 0px 4px 10px -8px ${({ theme }) => theme.borderColour};
  background-color: ${({ theme }) => theme.backgroundColour};
  & > button {
    padding: 0 1em;
  }
  & .nav-button {
    display: none !important;
    position: absolute;
    right: 2em;
    top: 2em;
    transform: translate(0, -50%);
  }

  @media (max-width: 768px) {
    & .nav-button {
      display: block !important;
    }
    & .title-children-container {
      flex-direction: column;
      align-items: end;
      div {
        display: none !important;
      }
      &.nav-open {
        div {
          display: initial !important;
        }
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  min-height: 3em;
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
export default function(props: NavBarConfig): JSX.Element {
  const flexChildren: Array<React.FunctionComponentElement<Base>> = [];
  const titleChildren: Array<React.FunctionComponentElement<Base>> = [];
  const [navOpen, setNavState] = React.useState(false);

  props.children.forEach(element => {
    let cloned = React.cloneElement(element);
    let children = element.props.children;
    // Add to titleChild if item isnt Button or doesnt contain button
    if (element.type !== Button) {
      if (
        (Array.isArray(children) &&
          !children.find(
            value => React.isValidElement(value) && value.type === Button
          )) ||
        (React.isValidElement(children) && children.type === Button)
      ) {
        flexChildren.push(cloned);
      } else {
        titleChildren.push(cloned);
      }
    } else {
      flexChildren.push(cloned);
    }
    console.log("titleChildren", titleChildren);
  });

  const theme = React.useContext(CTX);

  return (
    <div>
      {props.position === "fixed" && (
        <div
          style={{ width: "calc(100-4em)", height: "3em", padding: ".5em 2em" }}
        />
      )}

      <Root position={props.position} theme={theme}>
        <Flex className="children-container">
          <div
            className={`title-children-container ${navOpen ? "nav-open" : ""}`}
            style={{ flexGrow: 1 }}
          >
            {titleChildren}
          </div>
          {flexChildren}
          <Button
            type="borderless"
            className="nav-button"
            onClick={() => {
              setNavState(!navOpen);
            }}
          >
            <Menu size={25} />
          </Button>
        </Flex>
      </Root>
    </div>
  );
}
