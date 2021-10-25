import React from 'react'
import PropTypes from 'prop-types'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import Head from 'next/head'
import { capitalise } from '@/helpers/utils'

const BasePage = ({
  header,
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
      <Head>
        <meta property="og:title" content={`Feed | ${capitalise(header)}`} />
      </Head>
      <h1>{capitalise(header)}</h1>
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
