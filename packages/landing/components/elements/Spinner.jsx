import React from 'react'
import PropTypes from 'prop-types'
import BrokenCircleIcon from '@/icons/BrokenCircleIcon'
import brandColors from '@/constants/brandColors'

function Spinner({ width, color, className }) {
  return (
    <div className={['spinner', className].join(' ')}>
      <BrokenCircleIcon width={width} fill={color} />
    </div>
  )
}

Spinner.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  color: brandColors.green,
  width: 50,
  className: '',
}

export default Spinner
