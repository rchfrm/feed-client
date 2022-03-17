import React from 'react'
import PropTypes from 'prop-types'

import PillOptions from '@/elements/PillOptions'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'

const translateArrayToKey = (array) => {
  if (!array.length) return 'all'
  return array[0]
}

const translateKeyToArray = (key) => {
  if (key === 'all') return []
  return [key]
}

const TargetingGenderSelector = ({
  options,
  initialStateRaw,
  onChange,
  className,
}) => {
  const initialState = translateArrayToKey(initialStateRaw)
  // SETUP PILL BUTTONS
  const pillOptions = [
    {
      id: 'all',
      title: 'All',
      highlight: initialState === 'all',
    },
    {
      id: 'women',
      title: 'Women',
      highlight: initialState === 'women',
    },
    {
      id: 'men',
      title: 'Men',
      highlight: initialState === 'men',
    },
  ]


  // CONVERT GENDERS ARRAY TO KEY
  const activeOption = React.useMemo(() => {
    return translateArrayToKey(options)
  }, [options])

  // UPDATE STATE
  const setOption = React.useCallback((key) => {
    if (!key) return
    const gendersArray = translateKeyToArray(key)
    onChange(gendersArray)
  }, [onChange])

  return (
    <section className={[className].join(' ')}>
      <TargetingSectionHeader
        header="Genders"
        className="mb-6"
        tooltipMessage="“All, “female”, and “male” are the only gender targeting options provided by Facebook."
      />
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
        trackComponentName="TargetingGenderSelector"
      />
    </section>
  )
}

TargetingGenderSelector.propTypes = {
  options: PropTypes.array,
  initialStateRaw: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingGenderSelector.defaultProps = {
  options: [],
  initialStateRaw: [],
  className: null,
}


export default TargetingGenderSelector
