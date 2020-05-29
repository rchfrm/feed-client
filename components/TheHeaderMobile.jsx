// IMPORT PACKAGES
import React from 'react'

import PeekElement from 'react-peek-element'

import TheHeaderContents from './TheHeaderContents'

function TheHeaderMobile() {
  return (
    <PeekElement usePlaceHolder zIndex="28">
      <TheHeaderContents />
    </PeekElement>
  )
}

export default TheHeaderMobile
