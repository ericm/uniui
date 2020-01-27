import * as React from "react";
import { Base } from "./base";
import * as style from "./styles/Button.css";

export interface ButtonConfig extends Base {}
export default function(props: ButtonConfig): JSX.Element {
  const [clicked, setClicked] = React.useState(false);

  return <div className={style.root}>{props.children}</div>;
}
