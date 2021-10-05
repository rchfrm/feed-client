import PropTypes from 'prop-types'
import brandColors from '@/landing/constants/brandColors'

export default function MenuIcon({ fill, className }) {
  return (
    <div className={className}>
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420">
        <rect fill={fill} x="0" y="0" width="600" height="60" />
        <rect fill={fill} x="0" y="180" width="441.4" height="60" />
        <rect fill={fill} x="0" y="360" width="600" height="60" />
      </svg>
    </div>
  )
}

MenuIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

MenuIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
}
