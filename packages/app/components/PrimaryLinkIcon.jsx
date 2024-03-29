import React from 'react'
import PropTypes from 'prop-types'
import UserIcon from '@/icons/UserIcon'
import NotificationIcon from '@/icons/NotificationIcon'
import CreditCardIcon from '@/icons/CreditCardIcon'
import FaqIcon from '@/icons/FaqIcon'
import DocumentIcon from '@/icons/DocumentIcon'
import LogOutIcon from '@/icons/LogOutIcon'
import brandColors from '@/constants/brandColors'

const getIcon = (icon) => {
  if (icon === 'account') return UserIcon
  if (icon === 'notifications') return NotificationIcon
  if (icon === 'billing') return CreditCardIcon
  if (icon === 'faqs') return FaqIcon
  if (icon === 'terms') return DocumentIcon
  if (icon === 'signout') return LogOutIcon
}

const PrimaryLinkIcon = ({
  icon,
  isActive,
  isHover,
  className,
}) => {
  const Icon = getIcon(icon, isActive)

  return (
    <figure className={className}>
      <Icon
        className="w-5 h-auto"
        color={isActive || isHover ? brandColors.green : brandColors.grey}
        fill={isActive || isHover ? brandColors.green : brandColors.grey}
      />
    </figure>
  )
}

PrimaryLinkIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PrimaryLinkIcon.defaultProps = {
  className: '',
}

export default PrimaryLinkIcon
