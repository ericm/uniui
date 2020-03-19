import { jsx, Box, Flex, useColorMode } from 'theme-ui'
import { useConfig, useCurrentDoc } from 'docz'

import { NavBar, Button } from "../../../../../../src"

export const Header = props => {
  const { onOpen } = props
  const {
    repository,
    themeConfig: { showDarkModeSwitch, showMarkdownEditButton },
  } = useConfig()
  const { edit = true, ...doc } = useCurrentDoc()
  const [colorMode, setColorMode] = useColorMode()

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }

  return (
    <div>
      <NavBar position="fixed">
        <h1>Uniui</h1>
        <a href={repository}><Button type="borderless">GitHub</Button></a>
        <Button type="borderless">Home</Button>
      </NavBar>
    </div>
  )
}
