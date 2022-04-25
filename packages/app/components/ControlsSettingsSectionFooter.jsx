import React from 'react'
import PropTypes from 'prop-types'

import EmailIcon from '@/icons/EmailIcon'
import LightbulbIcon from '@/icons/LightbulbIcon'
import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'

const ControlsSettingsSectionFooter = ({
  children,
  top,
  bottom,
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
    <div className="absolute flex items-center mb-0" style={{ ...(top ? { top: `${top}px` } : { bottom: `${bottom}px` }) }}>
      <Icon
        fill={color}
        color={color}
        className={[
          'flex-none h-auto mr-2',
          icon === 'email' ? 'w-4' : 'w-3',
        ].join(' ')}
      />
      {copy && <MarkdownText markdown={copy} className={[className, 'text-xs italic mb-0'].join(' ')} />}
      {children}
    </div>
  )
}

ControlsSettingsSectionFooter.propTypes = {
  children: PropTypes.node,
  top: PropTypes.number,
  bottom: PropTypes.number,
  icon: PropTypes.string,
  color: PropTypes.string,
  copy: PropTypes.string,
  className: PropTypes.string,
}

ControlsSettingsSectionFooter.defaultProps = {
  children: null,
  top: 0,
  bottom: -26,
  icon: 'lightBulb',
  color: brandColors.instagram.bg,
  copy: '',
  className: null,
}

export default ControlsSettingsSectionFooter
