import React from 'react'
import PropTypes from 'prop-types'

import EmailIcon from '@/icons/EmailIcon'
import LightbulbIcon from '@/icons/LightbulbIcon'
import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'

const ControlsSettingsSectionFooter = ({
  children,
  icon,
  color,
  copy,
  className,
}) => {
  const icons = {
    email: EmailIcon,
    lightBulb: LightbulbIcon,
  }

  const Icon = icons[icon]

  return (
    <div className={[
      'flex items-center mb-0',
      className,
    ].join(' ')}
    >
      <Icon
        fill={color}
        color={color}
        className={[
          'flex-none h-auto mr-2',
          icon === 'email' ? 'w-4' : 'w-3',
        ].join(' ')}
      />
      {copy && <MarkdownText markdown={copy} className="text-xs italic mb-0" />}
      {children}
    </div>
  )
}

ControlsSettingsSectionFooter.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  color: PropTypes.string,
  copy: PropTypes.string,
  className: PropTypes.string,
}

ControlsSettingsSectionFooter.defaultProps = {
  children: null,
  icon: 'lightBulb',
  color: brandColors.instagram.bg,
  copy: '',
  className: null,
}

export default ControlsSettingsSectionFooter
