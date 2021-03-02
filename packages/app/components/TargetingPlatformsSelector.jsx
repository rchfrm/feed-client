import React from 'react'
import PropTypes from 'prop-types'

import PillOptions from '@/elements/PillOptions'
import Error from '@/elements/Error'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'

import copy from '@/app/copy/targetingPageCopy'

const translateArrayToKey = (array) => {
  if (!array.length) return 'both'
  return array[0]
}

const translateKeyToArray = (key) => {
  if (key === 'both') return []
  return [key]
}

const TargetingPlatformsSelector = ({
  options,
  initialStateRaw,
  onChange,
  className,
}) => {
  const initialState = React.useMemo(() => {
    return translateArrayToKey(initialStateRaw)
  }, [initialStateRaw])

  // SETUP PILL BUTTONS
  const pillOptions = [
    {
      id: 'both',
      title: 'Both',
      highlight: initialState === 'both',
    },
    {
      id: 'facebook',
      title: 'Facebook',
      highlight: initialState === 'facebook',
    },
    {
      id: 'instagram',
      title: 'Instagram',
      highlight: initialState === 'instagram',
    },
  ]


  // CONVERT GENDERS ARRAY TO KEY
  const activeOption = React.useMemo(() => {
    return translateArrayToKey(options)
  }, [options])

  // UPDATE STATE
  const setOption = React.useCallback((key) => {
    const optionsArray = translateKeyToArray(key)
    onChange(optionsArray)
  }, [onChange])

  const warningCopy = React.useMemo(() => {
    return copy.getPlatformWarningCopy(initialState, activeOption)
  }, [initialState, activeOption])

  return (
    <section className={[className].join(' ')}>
      <TargetingSectionHeader
        header="Platforms"
        description={copy.platformSelectDescription}
        className="mb-6"
      />
      <PillOptions
        color="green"
        options={pillOptions}
        activeOption={activeOption}
        setActiveOption={setOption}
        size="small"
        trackLabel="Target Platforms"
        style={{
          width: '101%',
          transform: 'translateX(-0.5%)',
        }}
      />
      {/* WARNING */}
      {warningCopy && (
        <div className="pt-5 -mb-4">
          <Error error={{ message: warningCopy }} />
        </div>
      )}
    </section>
  )
}

TargetingPlatformsSelector.propTypes = {
  options: PropTypes.array.isRequired,
  initialStateRaw: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingPlatformsSelector.defaultProps = {
  className: null,
}


export default TargetingPlatformsSelector
