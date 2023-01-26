import React from 'react'
import PropTypes from 'prop-types'
import BrokenCircleIcon from '@/icons/BrokenCircleIcon'
import brandColors from '@/constants/brandColors'

function Spinner({ width, fill, className }) {
  return (
    <div className={['spinner', className].join(' ')}>
      <BrokenCircleIcon width={width} fill={fill} />
    </div>
  )
}

Spinner.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  fill: brandColors.green,
  width: 50,
  className: '',
}

export default Spinner
