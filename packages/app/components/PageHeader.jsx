import React from 'react'
import PropTypes from 'prop-types'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import styles from '@/app/TheHeader.module.css'

const PageHeader = ({ className }) => {
  const { header, globalLoading } = React.useContext(InterfaceContext)
  const { text, visible } = header
  return (
    <div className={[className, !visible || globalLoading ? styles._hidden : ''].join(' ')}>
      <h1>{text}</h1>
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
