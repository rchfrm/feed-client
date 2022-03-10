import React from 'react'
import PropTypes from 'prop-types'

import EmailIcon from '@/icons/EmailIcon'
import LightbulbIcon from '@/icons/LightbulbIcon'
import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'

const ControlsSettingsSectionFooter = ({
  positionTop,
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
    <div className="absolute mb-0" style={{ top: `${positionTop}px` }}>
      <Icon
        fill={color}
        color={color}
        className={[
          'inline-block h-auto mr-2',
          icon === 'email' ? 'w-4' : 'w-3',
        ].join(' ')}
      />
      <MarkdownText markdown={copy} className={[className, 'text-xs inline-block'].join(' ')} />
    </div>
  )
}

ControlsSettingsSectionFooter.propTypes = {
  positionTop: PropTypes.number,
  icon: PropTypes.string,
  color: PropTypes.string,
  copy: PropTypes.string,
  className: PropTypes.string,
}

ControlsSettingsSectionFooter.defaultProps = {
  positionTop: 64,
  icon: 'lightBulb',
  color: brandColors.instagram.bg,
  copy: 'This is a footer',
  className: null,
}

export default ControlsSettingsSectionFooter
