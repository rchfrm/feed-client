import React from 'react'
import PropTypes from 'prop-types'
import { InterfaceContext } from '@/contexts/InterfaceContext'

const BasePage = ({
  header, // heading and punctuation
  staticPage,
  children,
}) => {
  // Get interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
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
  children: PropTypes.node.isRequired,
}

BasePage.defaultProps = {
  header: '',
  staticPage: false,
}


export default BasePage
