import * as React from 'react'
import { useMenus, Link } from 'docz'
import * as Uniui from "../../lib";

export const Menu = () => {
  const menus = useMenus()
  return (
    <Uniui.NavBar position="fixed">
      {menus.map(menu => (
        <Link to={menu.route}>
          <Uniui.Button>
            {menu.name}
          </Uniui.Button>
        </Link>
      ))}
    </Uniui.NavBar>
  )
}
