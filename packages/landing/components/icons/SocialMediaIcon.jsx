import PropTypes from 'prop-types'

import InstagramIcon from './InstagramIcon'
import FacebookIcon from './FacebookIcon'
import LinkedInIcon from './LinkedInIcon'
import TwitterIcon from './TwitterIcon'
import YouTubeIcon from './YouTubeIcon'
import GlobeIcon from './GlobeIcon'

const SocialMediaIcon = ({ platformName, width, fill }) => {
  switch (platformName) {
    case 'Instagram':
      return <InstagramIcon width={width} fill={fill} />
    case 'Facebook':
      return <FacebookIcon width={width} fill={fill} />
    case 'LinkedIn':
      return <LinkedInIcon width={width} fill={fill} />
    case 'Twitter':
      return <TwitterIcon width={width} fill={fill} />
    case 'YouTube':
      return <YouTubeIcon width={width} fill={fill} />
    default:
      return <GlobeIcon width={width} fill={fill} />
  }
}

SocialMediaIcon.propTypes = {
  platformName: PropTypes.string.isRequired,
  width: PropTypes.string,
  fill: PropTypes.string,
}

SocialMediaIcon.defaultProps = {
  width: '',
  fill: '',
}


export default SocialMediaIcon
