import * as React from "react";

declare type Base = Readonly<{
  children?: React.ReactNode;
  onClick?: React.EventHandler<React.MouseEvent>;
  style?: React.CSSProperties;
}>;
