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
      <h1>Text Field:</h1>
      <Components.TextField
        value="Text"
        subtitle="TextField"
        onChangeText={textChange}
      />
    </article>
    <article>
      <h1>Selections:</h1>
      <section>
        <h2>Radio:</h2>
        <Components.SelectionGroup>
          <Components.Selection type="radio" label="Radio button 1" />
          <Components.Selection type="radio" label="Radio button 2" />
        </Components.SelectionGroup>
      </section>
    </article>
  </div>,
  document.querySelector("#root")
);
