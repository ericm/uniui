import * as React from "react";

import styled from "styled-components";

export interface BoxConfig {}
function Box(props: BoxConfig): JSX.Element {
  return <div></div>;
}
export default styled(Box);
