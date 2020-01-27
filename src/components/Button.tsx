import * as React from "react";
import { Base } from "./base";
import * as style from "./styles/Button.css";

export interface ButtonConfig extends Base {
  onClick?: React.EventHandler<React.MouseEvent>;
}

export default function Button(props: ButtonConfig): JSX.Element {
  const [ripple, setRipple] = React.useState(style.ripple);
  const [coords, setCoords] = React.useState({top: 0, left: 0})

  const onClick = (e: React.MouseEvent) => {
    let [x, y] = [e.pageX, e.pageY];

    setRipple(`${style.ripple} ${style.rippleAnimation}`);
    setTimeout(() => setRipple(style.ripple), 500);

    props?.onClick(e);
  };

  return (
    <button style={{top:}} onClick={props.onClick} className={style.root}>
      <div className={style.button}>{props.children}</div>
      <div className={ripple}></div>
    </button>
  );
}
