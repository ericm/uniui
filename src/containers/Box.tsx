import * as React from "react";
import { cloneDeep } from "lodash";
import styled from "styled-components";

export interface BoxConfig {
  children: Array<React.ReactElement | JSX.Element>;
  layout: "horizontal" | "vertical";
}
function Box(props: BoxConfig): JSX.Element {
  let children = cloneDeep(props.children);
  for (let child of children) {
  }
  return <div>{children}</div>;
}
export default styled(Box);
