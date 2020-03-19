import { CSSProperties } from "styled-components"

export const ghostButton = {
  p: 0,
  outline: 'none',
  background: 'transparent',
  border: 'none',
  ':hover': {
    cursor: 'pointer',
  },
}
export const menuIcon = {
} as CSSProperties;

export const menuButton = {
  ...ghostButton,
  color: 'header.text',
  opacity: 0.5,
  cursor: 'pointer',
  top: '2em',
  position: 'fixed',
  zIndex: 10000
} as CSSProperties
