import React from 'react'
import PropTypes from 'prop-types'

import PillOptions from '@/elements/PillOptions'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'

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
  const initialState = translateArrayToKey(initialStateRaw)
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

  return (
    <section className={[className].join(' ')}>
      <TargetingSectionHeader className="mb-6" header="Platforms" />
      <PillOptions
        color="green"
        options={pillOptions}
        activeOption={activeOption}
        setActiveOption={setOption}
        size="small"
        style={{
          width: '101%',
          transform: 'translateX(-0.5%)',
        }}
      />
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
