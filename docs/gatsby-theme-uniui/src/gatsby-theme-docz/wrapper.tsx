import * as React from 'react'
import OriginalWrapper from 'gatsby-theme-docz/src/wrapper'

const Wrapper = ({ children, doc }) => {
  return (
    <div>
      <OriginalWrapper>{children}</OriginalWrapper>
    </div>
  )
}

export default Wrapper
