import * as React from "react";
import Button from "../components/Button";
import styled from "styled-components";
import { Base } from "../components/base";
import { Theme, CTX } from "../theme";

const Root = styled.div<{ theme: Theme }>`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5em 2em;
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
  align-items: center;
`;
export interface NavBarConfig {
  children: Array<React.FunctionComponentElement<Base>>;
}
export default function(props: NavBarConfig): JSX.Element {
  const flexChildren: Array<React.FunctionComponentElement<Base>> = [];
  const titleChildren: Array<React.FunctionComponentElement<Base>> = [];
  props.children.forEach(element => {
    let cloned = React.cloneElement(element);
    if (element.type !== Button) {
      // Checks if JSX Element is Button
      titleChildren.push(cloned);
    } else {
      flexChildren.push(cloned);
    }
  });

  const theme = React.useContext(CTX);

  return (
    <Root theme={theme}>
      <Flex>
        <div style={{ flexGrow: 1 }}>{titleChildren}</div>
        {flexChildren}
      </Flex>
    </Root>
  );
}
