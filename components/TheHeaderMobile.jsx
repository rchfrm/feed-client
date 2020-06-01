// IMPORT PACKAGES
import React from 'react'

// import PeekElement from 'react-peek-element'
import PeekElement from './PeekElement'

import TheHeaderContents from './TheHeaderContents'
import PageHeader from './PageHeader'

import styles from './TheHeader.module.css'

function TheHeaderMobile({ windowWidth }) {
  // TOGGLE HEADER FOR NARROW
  const [showHeader, setShowHeader] = React.useState(true)

  React.useEffect(() => {
    const showHeader = windowWidth < 450
    setShowHeader(showHeader)
  }, [windowWidth])

  return (
    <>
      <PeekElement usePlaceHolder zIndex="28">
        <TheHeaderContents windowWidth={windowWidth} />
      </PeekElement>
      {showHeader && <PageHeader className={styles.pageTitle} />}
    </>
  )
}

export default TheHeaderMobile
