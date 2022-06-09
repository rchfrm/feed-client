import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import ResultsTab from '@/app/ResultsTab'

const RadioButtonTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  hasNoProfiles,
  shouldHideTab,
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
        if ((shouldHideTab && index === 2) || (isDesktopLayout && hasNoProfiles)) return

        return (
          <ResultsTab
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
  hasNoProfiles: PropTypes.bool.isRequired,
  shouldHideTab: PropTypes.bool,
  className: PropTypes.string,
}

RadioButtonTabs.defaultProps = {
  shouldHideTab: false,
  className: '',
}

export default RadioButtonTabs
