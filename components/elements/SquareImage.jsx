// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

const SquareImage = ({ className, children }) => {
  return (
    <div className={['square--image', className].join(' ')}>
      {children}
    </div>
  )
}

SquareImage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

SquareImage.defaultProps = {
  className: '',
}


export default SquareImage
