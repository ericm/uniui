import * as React from "react";
import styled from "styled-components";
import { Base } from "../components/base";

function instanceOfUniui(props: any): props is Base {
  return "children" in props && "onClick" in props && "style" in props
}
export interface NavBarConfig {
  children: Array<React.ReactElement>;
}
export default function (props: NavBarConfig): JSX.Element {
  props.children.forEach(element => {
    if (instanceOfUniui(element.props)) {
    }
  })
  return <div></div>
}
