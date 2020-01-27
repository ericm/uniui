import * as React from "react";
import { Base } from "./base";
import * as style from "./styles/Button.css";

export interface ButtonConfig extends Base {
  onClick: React.EventHandler<any>;
}

export default function Button(props: ButtonConfig): JSX.Element {
  const [clicked, setClicked] = React.useState(false);

  return (
    <button onClick={props.onClick} className={style.root}>
      <div className={style.button}>{props.children}</div>
    </button>
  );
}
