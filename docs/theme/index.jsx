import * as React from 'react';
import { theme, useConfig, ComponentsProvider } from 'docz';
import { ThemeProvider } from 'theme-ui';

import { Menu } from "./Menu";

const Theme = ({ children }) => {
  const config = useConfig()
  return (
    <ThemeProvider theme={config}>
      <Menu />
      <ComponentsProvider components={map}>
        {children}
      </ComponentsProvider>
    </ThemeProvider>
  )
}

const themeConfig = {
  colors: {
    primary: 'tomato',
    secondary: 'khaki',
    gray: 'lightslategray',
  },
}
export default theme(themeConfig)(Theme)

