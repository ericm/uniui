import * as React from "react";

export interface Theme {
  borderColour: string;
  secondaryBackgroundColour: string;
  secondaryTextColour: string;
}

export const Themes: { [name: string]: Theme } = {
  light: {
    borderColour: "#16a085",
    secondaryBackgroundColour: "#1abc9c",
    secondaryTextColour: "#fff"
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

export const CTX = React.createContext(Themes["light"]);
export default CTX.Provider;
