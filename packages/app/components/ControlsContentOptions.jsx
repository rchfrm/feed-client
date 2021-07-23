import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

import copy from '@/app/copy/controlsPageCopy'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const { controlsOptions } = copy

const ControlsContentOptions = ({ className, activeSlug, controlsComponents }) => {
  const [activeOptionKey, setActiveOptionKey] = React.useState(activeSlug)
  const isDesktopLayout = useBreakpointTest('md')
  const { artist: { conversions_enabled: conversionsEnabled } } = React.useContext(ArtistContext)

  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const goToSpecificSetting = (key) => {
    setActiveOptionKey(key)
    if (isDesktopLayout) {
      Router.push({
        pathname: '/controls/[slug]',
        query: { slug: key },
      })
      return
    }
    // Open content in side-panel if mobile
    const content = controlsComponents[key]
    // Don't set a sidepanel button for the conversions settings
    const button = key === 'conversions' ? null : <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>

    setSidePanelContent(content)
    setSidePanelContentLabel(`controls ${key}`)
    toggleSidePanel(true)
    setSidePanelButton(button)
  }

  return (
    <div
      className={[
        'border-solid border-green border-t-2',
        className,
      ].join(' ')}
    >
      {controlsOptions.map((option) => {
        if (option.key === 'conversions' && !conversionsEnabled) return null
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
              'flex-shrink-0',
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
