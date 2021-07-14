import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const ChevronDoubleUpIcon = ({
  fill,
  stroke,
  className,
  style,
}) => {
  return (
    <svg
      width="292"
      height="394"
      viewBox="0 0 292 394"
      fill={fill}
      className={className}
      style={style}
    >
      <path
        d="M146.353 102.259L227.541 188.944C227.727 189.142 228.037 189.156 228.239 188.975L276.605 145.8C276.82 145.609 276.829 145.277 276.626 145.074L146.354 14.8169C146.158 14.6217 145.842 14.6217 145.646 14.8169L15.3529 145.095C15.1579 145.29 15.1576 145.606 15.3521 145.802L58.313 188.945C58.5082 189.141 58.8255 189.142 59.021 188.946L145.635 102.248C145.834 102.048 146.16 102.053 146.353 102.259Z"
        stroke={stroke}
        strokeWidth="29"
      />
      <path
        d="M146.353 291.666L227.541 378.351C227.727 378.549 228.037 378.563 228.239 378.382L276.605 335.207C276.82 335.016 276.829 334.684 276.626 334.481L146.354 204.224C146.158 204.028 145.842 204.028 145.646 204.224L15.3529 334.502C15.1579 334.697 15.1576 335.013 15.3521 335.208L58.313 378.352C58.5082 378.548 58.8255 378.548 59.021 378.353L145.635 291.654C145.834 291.454 146.16 291.46 146.353 291.666Z"
        stroke={stroke}
        strokeWidth="29"
      />
    </svg>
  )
}

ChevronDoubleUpIcon.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ChevronDoubleUpIcon.defaultProps = {
  fill: 'none',
  stroke: black,
  className: '',
  style: null,
}


export default ChevronDoubleUpIcon
