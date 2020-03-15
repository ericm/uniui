import * as React from 'react';
import { theme, useConfig } from 'docz';
import { ThemeProvider } from 'theme-ui';

import { Menu } from "./Menu";

const Theme = ({ children }) => {
  const config = useConfig();
  return (
    <ThemeProvider theme={config}>
      <Menu />
      <div>
        {children}
      </div>
    </ThemeProvider>
  )
};

const themeConfig = {
  colors: {
    primary: 'tomato',
    secondary: 'khaki',
    gray: 'lightslategray',
  },
};
export default theme(themeConfig)(Theme);

