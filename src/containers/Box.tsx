import * as React from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";
import { Base } from "../components/base";

export interface BoxConfig {
  children: Array<React.ReactElement<Base>>;
  layout: "horizontal" | "vertical";
}
function Box(props: BoxConfig): JSX.Element {
  let children = cloneDeep(props.children);
  for (let child of children) {
    child.props.style;
  }
  return <div>{children}</div>;
}
export default styled(Box);
