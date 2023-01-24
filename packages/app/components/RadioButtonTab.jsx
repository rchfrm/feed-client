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
    <button
      className={[
        'relative col-span-4 flex justify-center py-4 sm:py-0',
        ! isActive ? 'bg-gradient-to-t from-grey-light sm:bg-none' : null,
      ].join(' ')}
      onClick={() => onClick(name)}
    >
      <li
        className="flex flex-column justify-center items-center"
      >
        {! isDesktopLayout && <p className="mb-2 font-bold">{capitalise(name)}</p>}
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
      </li>
      {isDesktopLayout && (
        <RadioButtonTabLine
          index={index}
          isActive={isActive}
        />
      )}
    </button>
  )
}

RadioButtonTab.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
}

export default RadioButtonTab
