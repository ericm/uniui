import * as React from "react";
import { render } from "react-dom";

import * as Components from "../src";

const textChange = (s: string) => console.log(s);

render(
  <div>
    <Components.Theme value={Components.Themes.lime}>
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
    </Components.Theme>
    <article>
      <Components.TextField
        value="Text"
        subtitle="TextField"
        onChangeText={textChange}
      />
    </article>
  </div>,
  document.querySelector("#root")
);
