import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

export default function CrossIcon({ fill, className }) {
  return (
    <div className={className}>
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <rect fill={fill} y="270" width="600" height="60" transform="translate(300 724.264)rotate(-135)" />
        <rect fill={fill} y="270" width="600" height="60" transform="translate(-124.264 300)rotate(-45)" />
      </svg>
    </div>
  )
}

CrossIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

CrossIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
}

