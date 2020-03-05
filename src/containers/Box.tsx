import * as React from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import { Base } from "../components/base";

const Root = styled.div<{ layout: "horizontal" | "vertical" }>`
  display: grid;
  padding: 2em;
  grid-gap: 3em;
  ${({ layout }) =>
    (layout === "horizontal" &&
      `
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  `) ||
    (layout === "vertical" &&
      `
  `)}
`;
export interface BoxConfig {
  children: Array<React.ReactElement<Base>>;
  layout: "horizontal" | "vertical";
}
export default function Box(props: BoxConfig): JSX.Element {
  let children = cloneDeep(props.children);
  switch (props.layout) {
    case "horizontal":
      break;
  }
  return <Root layout={props.layout}>{children}</Root>;
}
export const BoxStyled = styled(Box);
