import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import RadioButtonTab from '@/app/RadioButtonTab'

const RadioButtonTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  hasNoProfiles,
  shouldHideTab,
  tabToHideIndex,
  className,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')

  return (
    <ul className={[
      className,
      'col-span-12 grid grid-cols-12 sm:gap-x-12',
      'justify-around mb-0',
    ].join(' ')}
    >
      {tabs.map(({ name }, index) => {
        if ((shouldHideTab && index === tabToHideIndex) || (isDesktopLayout && hasNoProfiles)) return

        return (
          <RadioButtonTab
            key={name}
            name={name}
            index={index}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        )
      })}
    </ul>
  )
}

RadioButtonTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  hasNoProfiles: PropTypes.bool,
  shouldHideTab: PropTypes.bool,
  tabToHideIndex: PropTypes.number,
  className: PropTypes.string,
}

RadioButtonTabs.defaultProps = {
  shouldHideTab: false,
  tabToHideIndex: 0,
  hasNoProfiles: false,
  className: '',
}

export default RadioButtonTabs
