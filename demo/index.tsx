import * as React from "react";
import { render } from "react-dom";

import * as Components from "../src";

render(
  <div>
    <article>
      <h1>Button Raised:</h1>
      <Components.Button>Button</Components.Button>
    </article>
    <article>
      <h1>Button Flat:</h1>
      <Components.Button type="flat">Button</Components.Button>
    </article>
    <article>
      <h1>Button Borderless:</h1>
      <Components.Button type="borderless">Button</Components.Button>
    </article>
  </div>,
  document.querySelector("#root")
);
