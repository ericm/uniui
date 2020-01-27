import * as React from "react";
import { Base } from "./base";

export interface ButtonConfig extends Base {}
export default function(props: ButtonConfig): JSX.Element {
    const [clicked, setClicked] = React.useState(false);

    return <button>{props.children}</button>;
}
