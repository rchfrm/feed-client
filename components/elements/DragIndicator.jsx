import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

const DragIndicator = ({ dragDirection, className }) => {
  const thickness = 6
  const length = 80
  const style = {
    width: dragDirection === 'vertical' ? length : thickness,
    height: dragDirection === 'vertical' ? thickness : length,
    background: brandColors.greyLight,
    borderRadius: '3px',
  }
  return (
    <div className={className} style={style} />
  )
}

DragIndicator.propTypes = {
  dragDirection: PropTypes.string,
  className: PropTypes.string,
}

DragIndicator.defaultProps = {
  dragDirection: 'vertical',
  className: '',
}


export default DragIndicator
