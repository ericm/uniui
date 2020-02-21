import * as React from "react";
import { Base } from "./base";
import { applyTheme, CTX } from "../theme";

import * as style from "./styles/Button.css";

export interface ButtonConfig extends Base {
  type?: "standard" | "flat" | "borderless";
}

export default function Button(props: ButtonConfig): JSX.Element {
  const [ripple, setRipple] = React.useState(style.ripple),
    [coords, setCoords] = React.useState({ top: 0, left: 0 }),
    ref = React.useRef<HTMLButtonElement>();
  let buttonStyle: string;
  switch (props.type) {
    case "flat":
      buttonStyle = style.flatButton;
      break;
    case "borderless":
      buttonStyle = style.borderlessButton;
      break;
    default:
      buttonStyle = style.button;
  }

  const theme = React.useContext(CTX);

  const onClick = (e: React.MouseEvent) => {
    if (ref?.current) {
      let [x, y] = [
        e.pageX - ref?.current.offsetLeft,
        e.pageY - ref?.current.offsetTop
      ];

      setCoords({ top: y, left: x });
    }
    setRipple(`${style.rippleAnimation} ${style.ripple}`);
    setTimeout(() => setRipple(style.ripple), 500);

    // Passthrough event to user defined onClick
    if (props.onClick) props.onClick(e);
  };

  React.useEffect(() => applyTheme(theme, ref));

  return (
    <button
      style={props.style}
      ref={ref}
      onClick={onClick}
      className={style.root}
    >
      <div className={style.container}>
        <div className={buttonStyle}>{props.children}</div>
        <div style={coords} className={ripple}></div>
      </div>
    </button>
  );
}
