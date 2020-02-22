import * as React from "react";
import { render } from "react-dom";

import * as Uniui from "../src";
import { lime, berry } from "../src/theme";

const textChange = (s: string) => console.log(s);

render(
  <div>
    <Uniui.Themer value={lime}>
      <article>
        <h1>Button Raised:</h1>
        <Uniui.Button>Button</Uniui.Button>
      </article>
      <article>
        <h1>Button Flat:</h1>
        <Uniui.Button type="flat">Button</Uniui.Button>
      </article>
      <article>
        <h1>Button Borderless:</h1>
        <Uniui.Button type="borderless">Button</Uniui.Button>
      </article>
    </Uniui.Themer>
    <article>
      <h1>Text Field:</h1>
      <Uniui.TextField
        value="Text"
        subtitle="TextField"
        onChangeText={textChange}
      />
    </article>
    <article>
      <h1>Selections:</h1>
      <section>
        <h2>Radio:</h2>
        <Uniui.SelectionGroup>
          <Uniui.Selection type="radio" label="Radio button 1" />
          <Uniui.Selection type="radio" label="Radio button 2" />
          <Uniui.Selection type="radio" label="Radio button 3" />
        </Uniui.SelectionGroup>
      </section>
      <section>
        <h2>Checkbox:</h2>
        <Uniui.SelectionGroup>
          <Uniui.Selection type="checkbox" label="Checkbox 1" />
          <Uniui.Selection type="checkbox" label="Checkbox 2" />
          <Uniui.Selection type="checkbox" label="Checkbox 3" />
        </Uniui.SelectionGroup>
      </section>
      <section>
        <h2>Switch:</h2>
        <Uniui.SelectionGroup>
          <Uniui.Selection type="switch" label="Switch 1"></Uniui.Selection>
          <Uniui.Selection type="switch" label="Switch 2"></Uniui.Selection>
          <Uniui.Selection type="switch" label="Switch 3"></Uniui.Selection>
        </Uniui.SelectionGroup>
      </section>
    </article>
  </div>,
  document.querySelector("#root")
);
