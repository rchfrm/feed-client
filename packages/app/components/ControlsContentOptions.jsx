import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import CrosshairIcon from '@/icons/CrosshairIcon'
import JigsawIcon from '@/icons/JigsawIcon'
import MegaphoneIcon from '@/icons/MegaphoneIcon'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/controlsPageCopy'

const { controlsOptions } = copy

const icons = {
  link: <LinkIcon fill={brandColors.blue} className="w-6 h-auto" />,
  crosshair: <CrosshairIcon fill={brandColors.blue} className="w-6 h-auto" />,
  jigsaw: <JigsawIcon fill={brandColors.blue} className="w-6 h-auto" />,
  megaphone: <MegaphoneIcon fill={brandColors.blue} className="w-6 h-auto" />,
}

const ControlsContentOptions = ({ className }) => {
  const [activeOptionKey, setActiveOptionKey] = React.useState(controlsOptions[0].key)
  return (
    <div
      className={[
        'border-solid border-green border-t-2',
        className,
      ].join(' ')}
    >
      {controlsOptions.map((option) => {
        if (option.hidden) return null
        const { key, title, description, icon: iconSlug } = option
        const Icon = icons[iconSlug] || null
        const isActive = key === activeOptionKey
        return (
          <a
            key={key}
            role="button"
            className={[
              'flex no-underline',
              'py-4',
              'border-solid border-green border-b-2',
            ].join(' ')}
            onClick={() => setActiveOptionKey(key)}
          >
            {/* ICON */}
            <div className="mr-5" style={{ opacity: isActive ? 1 : 1 }}>
              <div
                // className="w-8 h-8 rounded-full flex items-center justify-center"
              >
                {Icon}
              </div>
            </div>
            {/* TITLE */}
            <div>
              <p className="font-bold mb-2">{title}</p>
              <p className="mb-0">{description}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

ControlsContentOptions.propTypes = {
  className: PropTypes.string,
}

ControlsContentOptions.defaultProps = {
  className: null,
}

export default ControlsContentOptions
