import * as React from "react";
import Button from "../components/Button";
import styled from "styled-components";

const Root = styled.div`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5em 1em;
`;
const Flex = styled.div`
  display: flex;
`;
export interface NavBarConfig {
  children: Array<JSX.Element>;
}
export default function(props: NavBarConfig): JSX.Element {
  const flexChildren: Array<JSX.Element> = [];
  const navChildren: Array<JSX.Element> = [];
  let i = 0;
  props.children.forEach(element => {
    if (element.type === Button) {
      // Checks if JSX Element is Button
      flexChildren.push(React.cloneElement(element));
    } else {
      navChildren.push(element);
    }
  });
  return (
    <Root>
      {navChildren}
      <Flex>{flexChildren}</Flex>
    </Root>
  );
}
