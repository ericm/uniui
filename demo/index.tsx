import * as React from "react";
import { render } from "react-dom";

import * as Components from "../src";

render(
  <div>
    <article>
      <h1>Button:</h1>
      <Components.Button>Button</Components.Button>
    </article>
  </div>,
  document.querySelector("#root")
);
