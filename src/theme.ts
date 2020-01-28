import * as React from "react";

export interface Theme {
  borderColour: string;

  backgroundColour: string;
  textColour: string;
  secondaryBackgroundColour: string;
  secondaryTextColour: string;

  buttonRipple: string;
  buttonDarkRipple: string;
}

export const Themes: { [name: string]: Theme } = {
  lime: {
    borderColour: "#16a085",

    backgroundColour: "#fff",
    textColour: "#111",
    secondaryBackgroundColour: "#1abc9c",
    secondaryTextColour: "#fff",

    buttonRipple: "rgba(255, 255, 255, 0.4)",
    buttonDarkRipple: "rgba(0, 0, 0, 0.3)"
  },
  limeDark: {
    borderColour: "#16a085",

    backgroundColour: "#111",
    textColour: "fff",
    secondaryBackgroundColour: "#1abc9c",
    secondaryTextColour: "#fff",

    buttonRipple: "rgba(255, 255, 255, 0.4)",
    buttonDarkRipple: "rgba(0, 0, 0, 0.3)"
  },
  berry: {
    borderColour: "#c0392b",

    backgroundColour: "#fff",
    textColour: "#111",
    secondaryBackgroundColour: "#e74c3c",
    secondaryTextColour: "#fff",

    buttonRipple: "rgba(255, 255, 255, 0.4)",
    buttonDarkRipple: "rgba(0, 0, 0, 0.3)"
  }
};

export function applyTheme<T extends HTMLElement>(
  theme: Theme,
  ref: React.MutableRefObject<T>
) {
  Object.keys(theme).forEach(key =>
    ref.current.style.setProperty(`--${key}`, theme[key])
  );
}

export const CTX = React.createContext(Themes.lime);
export default CTX.Provider;
