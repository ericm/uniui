import * as React from "react";

declare type Base = Readonly<{
  children?: React.ReactNode;
  /**
   * onClick event to be passed through to the target
   */
  onClick?: React.EventHandler<React.MouseEvent>;
  /**
   * Styles to be passed through to the target
   */
  style?: React.CSSProperties;
}>;
