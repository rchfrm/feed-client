import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const PlusIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M169 0C160.716 0 154 6.71573 154 15V154H15C6.71573 154 2.66639e-06 160.716 2.66639e-06 169L0 215C-3.62117e-07 223.284 6.71573 230 15 230H154V369C154 377.284 160.716 384 169 384H215C223.284 384 230 377.284 230 369V230H369C377.284 230 384 223.284 384 215V169C384 160.716 377.284 154 369 154H230V15C230 6.71573 223.284 0 215 0H169Z"
        fill={fill}
      />
    </svg>

  )
}

PlusIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

PlusIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}


export default PlusIcon
