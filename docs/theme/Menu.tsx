import React from 'react'
import { useMenus, Link } from 'docz'
import * as Uniui from "../../src";

export const Menu = () => {
  const menus = useMenus()
  return (
    <Uniui.NavBar position="fixed">
      {menus.map(menu => (
        <Uniui.Button>
          <Link to={menu.route}>{menu.name}</Link>
        </Uniui.Button>
      ))}
    </Uniui.NavBar>
  )
}
