import React from 'react'
import PropTypes from 'prop-types'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import styles from '@/TheHeader.module.css'

const PageHeader = ({ className }) => {
  const { header, globalLoading } = React.useContext(InterfaceContext)
  const { text, punctuation, visible } = header
  return (
    <div className={[className, !visible || globalLoading ? styles._hidden : ''].join(' ')}>
      <h1>{text + punctuation}</h1>
    </div>
  )
}

PageHeader.propTypes = {
  className: PropTypes.string,
}

PageHeader.defaultProps = {
  className: '',
}


export default PageHeader
