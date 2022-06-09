import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import SplitViewOptionsItem from '@/app/SplitViewOptionsItem'

import Button from '@/elements/Button'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const SplitViewOptions = ({
  contentComponents,
  options,
  basePath,
  activeOption,
  setActiveOption,
  className,
}) => {
  const isDesktopLayout = useBreakpointTest('md')

  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const goToSpecificSetting = (key, hasDefaultSidePanelButton) => {
    setActiveOption(key)

    if (!basePath) return

    if (isDesktopLayout) {
      Router.push({
        pathname: `${basePath}/${key}`,
      })
      return
    }
    // Open content in side-panel if mobile
    const content = contentComponents[key]
    // Set a sidepanel button unless the component has a custom sidepanel button itself
    const button = hasDefaultSidePanelButton ? <Button version="green" onClick={() => toggleSidePanel(false)} trackComponentName="ControlsContentOptions">Done</Button> : null

    setSidePanelContent(content)
    setSidePanelContentLabel(`${basePath} ${key}`)
    toggleSidePanel(true)
    setSidePanelButton(button)
  }

  React.useEffect(() => {
    setActiveOption(activeOption)
  }, [activeOption, setActiveOption])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {options.map((option, index) => {
        const { key } = option
        const isActive = key === activeOption
        const isLast = index === options.length - 1

        return (
          <SplitViewOptionsItem
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

SplitViewOptions.propTypes = {
  contentComponents: PropTypes.object.isRequired,
  options: PropTypes.array,
  basePath: PropTypes.string,
  activeOption: PropTypes.string.isRequired,
  setActiveOption: PropTypes.func.isRequired,
  className: PropTypes.string,
}

SplitViewOptions.defaultProps = {
  options: [],
  basePath: '',
  className: null,
}

export default SplitViewOptions
