import PropTypes from 'prop-types'
import SocialMediaIcon from '@/landing/icons/SocialMediaIcon'
import Anchor from '@/landing/elements/Anchor'
import brandColors from '@/constants/brandColors'

export default function TheFooterSocialLink({ link, index }) {
  return (
    <li className={['w-5', 'md:w-6', 'mr-5', 'last:mr-0'].join(' ')} key={index}>
      <Anchor href={link.href} label={link.name}>
        <SocialMediaIcon platformName={link.name} width="100%" fill={brandColors.offwhite} />
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
