import * as React from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import { Base } from "../components/base";

const Root = styled.div`
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex: 0 0 100%;
  display: flex;
`;
export interface BoxConfig {
  children: Array<React.ReactElement<Base>>;
  layout: "horizontal" | "vertical";
}
export default function Box(props: BoxConfig): JSX.Element {
  let children = cloneDeep(props.children);
  switch (props.layout) {
    case "horizontal":
      for (let child of children) {
        child.props.style = { padding: "2em" };
      }
      break;
  }
  return <Root>{children}</Root>;
}
export const BoxStyled = styled(Box);
