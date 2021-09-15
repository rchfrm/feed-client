import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'
import SocialMediaIcon from '@/icons/SocialMediaIcon'
import Anchor from '@/elements/Anchor'

export default function TheFooterSocialLink({ link, index }) {
  return (
    <li key={index}>
      <Anchor href={link.href} label={link.name}>
        <SocialMediaIcon platformName={link.name} width="100%" fill={brandColors.white} />
      </Anchor>
    </li>
  )
}

TheFooterSocialLink.propTypes = {
  index: PropTypes.number.isRequired,
  link: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
}
