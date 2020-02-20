import * as React from "react";

export interface Theme {
  fontFamily: string;

  borderColour: string;

  backgroundColour: string;
  textColour: string;
  secondaryBackgroundColour: string;
  secondaryTextColour: string;

  buttonRipple: string;
  buttonDarkRipple: string;

  accentColour: string;
}

export const lime: Theme = {
  fontFamily: '"Open Sans", sans-serif',

  borderColour: "#16a085",

  backgroundColour: "#fff",
  textColour: "#111",
  secondaryBackgroundColour: "#1abc9c",
  secondaryTextColour: "#fff",

  buttonRipple: "rgba(255, 255, 255, 0.4)",
  buttonDarkRipple: "rgba(0, 0, 0, 0.3)",

  accentColour: "#707171"
};

export const limeDark: Theme = {
  fontFamily: '"Open Sans", sans-serif',

  borderColour: "#16a085",

  backgroundColour: "#111",
  textColour: "fff",
  secondaryBackgroundColour: "#1abc9c",
  secondaryTextColour: "#fff",

  buttonRipple: "rgba(255, 255, 255, 0.4)",
  buttonDarkRipple: "rgba(0, 0, 0, 0.3)",

  accentColour: "#707171"
};
export const berry: Theme = {
  fontFamily: '"Open Sans", sans-serif',

  borderColour: "#c0392b",

  backgroundColour: "#fff",
  textColour: "#111",
  secondaryBackgroundColour: "#e74c3c",
  secondaryTextColour: "#fff",

  buttonRipple: "rgba(255, 255, 255, 0.4)",
  buttonDarkRipple: "rgba(0, 0, 0, 0.3)",

  accentColour: "#707171"
};
export const Themes: { [name: string]: Theme } = { lime, limeDark, berry };

export function applyTheme<T extends HTMLElement>(
  theme: Theme,
  ref: React.MutableRefObject<T>
) {
  Object.keys(theme).forEach(key =>
    ref.current.style.setProperty(`--${key}`, theme[key])
  );
}

export const CTX = React.createContext(Themes.lime);
interface Props extends React.ProviderProps<Theme> {
  googleFonts?: boolean;
}

export default CTX.Provider;
