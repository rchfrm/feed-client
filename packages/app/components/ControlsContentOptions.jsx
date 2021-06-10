import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import copy from '@/app/copy/controlsPageCopy'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const { controlsOptions } = copy

const ControlsContentOptions = ({ className, activeSlug }) => {
  const [activeOptionKey, setActiveOptionKey] = React.useState(activeSlug)
  const isDesktopLayout = useBreakpointTest('md')

  const goToSpecificSetting = (key) => {
    setActiveOptionKey(key)
    Router.push({
      pathname: '/controls/[slug]',
      query: { slug: key },
    })

    // Open content in side-panel if mobile
    if (!isDesktopLayout) {
      console.log('open side-panel')
    }
  }

  return (
    <div
      className={[
        'border-solid border-green border-t-2',
        className,
      ].join(' ')}
    >
      {controlsOptions.map((option) => {
        if (option.hidden) return null
        const { key, title, description } = option
        const isActive = key === activeOptionKey
        return (
          <a
            key={key}
            role="button"
            className={[
              'flex items-center no-underline',
              'py-4',
              'border-solid border-green border-b-2',
            ].join(' ')}
            onClick={() => goToSpecificSetting(key)}
          >
            {/* TITLE */}
            <div className={[
              'w-8 h-8',
              'mr-4',
              'rounded-full',
              isActive ? 'bg-green' : 'bg-grey-2'].join(' ')}
            />
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
  activeSlug: PropTypes.string.isRequired,
}

ControlsContentOptions.defaultProps = {
  className: null,
}

export default ControlsContentOptions
