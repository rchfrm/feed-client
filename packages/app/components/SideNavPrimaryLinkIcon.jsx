import React from 'react'
import PropTypes from 'prop-types'
import SettingsIcon from '@/icons/SettingsIcon'
import NotificationIcon from '@/icons/NotificationIcon'
import CreditCardIcon from '@/icons/CreditCardIcon'
import FaqIcon from '@/icons/FaqIcon'
import DocumentIcon from '@/icons/DocumentIcon'
import LogOutIcon from '@/icons/LogOutIcon'
import brandColors from '@/constants/brandColors'

const getIcon = (icon) => {
  if (icon === 'settings') return SettingsIcon
  if (icon === 'notifications') return NotificationIcon
  if (icon === 'billing') return CreditCardIcon
  if (icon === 'faqs') return FaqIcon
  if (icon === 'terms') return DocumentIcon
  if (icon === 'signout') return LogOutIcon
}

const SideNavPrimaryLinkIcon = ({
  icon,
  isActive,
  isHover,
  className,
}) => {
  const Icon = getIcon(icon, isActive)

  return (
    <figure className={className}>
      <Icon
        color={isActive || isHover ? brandColors.green : brandColors.grey}
        fill={isActive || isHover ? brandColors.green : brandColors.grey}
      />
    </figure>
  )
}

SideNavPrimaryLinkIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

SideNavPrimaryLinkIcon.defaultProps = {
  className: '',
}

export default SideNavPrimaryLinkIcon
