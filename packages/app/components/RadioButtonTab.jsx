import React from 'react'
import PropTypes from 'prop-types'

import RadioButtonTabLine from '@/app/RadioButtonTabLine'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import { capitalise } from '@/helpers/utils'

const RadioButtonTab = ({
  name,
  index,
  activeTab,
  setActiveTab,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const isActive = activeTab === name

  const onClick = (audience) => {
    setActiveTab(audience)
  }

  return (
    <li className="relative col-span-4 flex justify-center">
      <button
        onClick={() => onClick(name)}
        className="flex flex-column justify-center items-center"
      >
        {!isDesktopLayout && <p className="mb-2">{capitalise(name)}</p>}
        <div
          className={[
            'flex justify-center items-center',
            'w-6 h-6 sm:w-12 sm:h-12',
            'border-2 border-solid border-black',
            'rounded-full',
          ].join(' ')}
        >
          {isActive && <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-green" />}
        </div>
      </button>
      {isDesktopLayout && (
        <RadioButtonTabLine
          index={index}
          isActive={isActive}
        />
      )}
    </li>
  )
}

RadioButtonTab.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
}

export default RadioButtonTab
