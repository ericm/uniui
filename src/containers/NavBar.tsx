import * as React from "react";
import styled from "styled-components";
import { Base } from "../components/base";
import { ButtonConfig } from "../components/Button";

function instanceOfUniui(props: any): props is Base {
  return "children" in props && "onClick" in props && "style" in props;
}
function isButton(props: Base): props is ButtonConfig {
  return "type" in props;
}
export interface NavBarConfig {
  children: Array<JSX.Element>;
}
export default function (props: NavBarConfig): JSX.Element {
  props.children.forEach(element => {
    let el_props = element.props;
    if (instanceOfUniui(el_props)) {
      if (isButton(el_props)) {
        console.log(el_props);
      }
    }
  })
  return <div></div>
}
