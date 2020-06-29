import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

const BasePage = ({
  header, // heading and punctuation
  staticPage,
  authPage,
  children,
}) => {
  // Get interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const { artistLoading } = React.useContext(ArtistContext)
  // ON MOUNT
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    if (mounted) return
    setMounted(true)
    // If page is static, stop global loading when mounts
    if (staticPage) {
      toggleGlobalLoading(false)
    }
  }, [toggleGlobalLoading, setMounted, mounted, staticPage])

  // Turn off global loading when
  // 1. artist finishes loading
  // 2. page is not artist senstive
  // 3. It's an auth page (ie, login or signup)
  React.useEffect(() => {
    console.log('artistLoading', artistLoading)
    if (!artistLoading && !authPage) {
      toggleGlobalLoading(false)
    }
  }, [artistLoading, authPage, toggleGlobalLoading])
  return (
    <>
      <h1>{header}</h1>
      {children}
    </>
  )
}

BasePage.propTypes = {
  header: PropTypes.string,
  staticPage: PropTypes.bool,
  authPage: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

BasePage.defaultProps = {
  header: '',
  staticPage: false,
  authPage: false,
}


export default BasePage
