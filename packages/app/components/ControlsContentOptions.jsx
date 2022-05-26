import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import ControlsContentOptionsItem from '@/app/ControlsContentOptionsItem'

import Button from '@/elements/Button'

import copy from '@/app/copy/controlsPageCopy'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const { controlsOptions } = copy

const ControlsContentOptions = ({ className, activeSlug, controlsComponents }) => {
  const [activeOptionKey, setActiveOptionKey] = React.useState(activeSlug)
  const isDesktopLayout = useBreakpointTest('md')

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
        pathname: `/controls/${key}`,
      })
      return
    }
    // Open content in side-panel if mobile
    const content = controlsComponents[key]
    // Don't set a sidepanel button for the targeting settings
    const excludedSlugs = ['targeting']
    const button = excludedSlugs.includes(key) ? null : <Button version="green" onClick={() => toggleSidePanel(false)} trackComponentName="ControlsContentOptions">Done</Button>

    setSidePanelContent(content)
    setSidePanelContentLabel(`controls ${key}`)
    toggleSidePanel(true)
    setSidePanelButton(button)
  }

  React.useEffect(() => {
    setActiveOptionKey(activeSlug)
  }, [activeSlug])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {controlsOptions.map((option, index) => {
        const { key } = option
        const isActive = key === activeOptionKey
        const isLast = index === controlsOptions.length - 1

        return (
          <ControlsContentOptionsItem
            key={key}
            option={option}
            isActive={isActive}
            isLast={isLast}
            goToSpecificSetting={goToSpecificSetting}
          />
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
