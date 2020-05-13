import React from 'react'
import PropTypes from 'prop-types'
import { InterfaceContext } from './contexts/InterfaceContext'

const PageHeader = ({ className }) => {
  const { header } = React.useContext(InterfaceContext)
  const { text, punctuation, visible } = header
  return (
    <div className={[className, !visible ? '_hidden' : ''].join(' ')}>
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
