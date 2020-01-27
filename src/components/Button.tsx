import * as React from "react";
import { Base } from "./base";
import * as style from "./styles/Button.css";

export interface ButtonConfig extends Base {
  onClick?: React.EventHandler<React.MouseEvent>;
  type?: "standard" | "flat";
}

export default function Button(props: ButtonConfig): JSX.Element {
  const [ripple, setRipple] = React.useState(style.ripple),
    [coords, setCoords] = React.useState({ top: 0, left: 0 }),
    ref = React.useRef<HTMLButtonElement>();
  const buttonStyle = props.type === "flat" ? style.flatButton : style.button;

  const onClick = (e: React.MouseEvent) => {
    let [x, y] = [
      e.pageX - ref?.current.offsetLeft,
      e.pageY - ref?.current.offsetTop
    ];

    setCoords({ top: y, left: x });
    setRipple(`${style.rippleAnimation} ${style.ripple}`);
    setTimeout(() => setRipple(style.ripple), 500);

    // Passthrough event to user defined onClick
    if (props.onClick) props.onClick(e);
  };

  return (
    <button ref={ref} onClick={onClick} className={style.root}>
      <div style={coords} className={ripple}></div>
      <div className={buttonStyle}>{props.children}</div>
    </button>
  );
}
