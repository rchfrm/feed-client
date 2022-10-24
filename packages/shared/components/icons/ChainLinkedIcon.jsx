import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const ChainLinkedIcon = ({
  fill,
  className,
  style,
}) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g clipPath="url(#clip0_903_1133)">
        <rect x="17.6866" y="5.24875" width="2.93162" height="17.5897" rx="1.46581" transform="rotate(45 17.6866 5.24875)" fill={fill} />
        <path d="M12.5041 2.13515C15.3663 -0.727023 20.0068 -0.727023 22.869 2.13515C25.7312 4.99732 25.7312 9.63782 22.869 12.5L19.7595 15.6094C19.1871 16.1819 18.259 16.1819 17.6866 15.6094C17.1141 15.037 17.1141 14.1089 17.6866 13.5365L20.796 10.427C22.5133 8.70972 22.5133 5.92542 20.796 4.20812C19.0787 2.49081 16.2944 2.49081 14.5771 4.20812L11.4677 7.31757C10.8952 7.89 9.96713 7.89 9.39469 7.31757C8.82226 6.74514 8.82226 5.81704 9.39469 5.2446L12.5041 2.13515Z" fill={fill} />
        <path d="M12.5 22.869C9.63783 25.7312 4.99733 25.7312 2.13516 22.869C-0.727015 20.0068 -0.727016 15.3663 2.13516 12.5042L5.24461 9.3947C5.81704 8.82227 6.74514 8.82227 7.31758 9.3947C7.89001 9.96713 7.89001 10.8952 7.31758 11.4677L4.20812 14.5771C2.49082 16.2944 2.49082 19.0787 4.20812 20.796C5.92543 22.5133 8.70973 22.5133 10.427 20.796L13.5365 17.6866C14.1089 17.1141 15.037 17.1141 15.6095 17.6866C16.1819 18.259 16.1819 19.1871 15.6095 19.7595L12.5 22.869Z" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_903_1133">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

ChainLinkedIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ChainLinkedIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}

export default ChainLinkedIcon
