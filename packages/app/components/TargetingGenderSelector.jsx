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
  genders,
  initialGenders,
  onChange,
  className,
}) => {
  const initialGenderState = translateArrayToKey(initialGenders)
  // SETUP PILL BUTTONS
  const pillOptions = [
    {
      id: 'all',
      title: 'All',
      highlight: initialGenderState === 'all',
    },
    {
      id: 'women',
      title: 'Women',
      highlight: initialGenderState === 'women',
    },
    {
      id: 'men',
      title: 'Men',
      highlight: initialGenderState === 'men',
    },
  ]


  // CONVERT GENDERS ARRAY TO KEY
  const currentGender = React.useMemo(() => {
    return translateArrayToKey(genders)
  }, [genders])

  // UPDATE STATE
  const setGender = React.useCallback((key) => {
    const gendersArray = translateKeyToArray(key)
    onChange(gendersArray)
  }, [onChange])

  return (
    <section className={[className].join(' ')}>
      <TargetingSectionHeader className="mb-6" header="Genders" />
      <PillOptions
        color="green"
        options={pillOptions}
        activeOption={currentGender}
        setActiveOption={setGender}
        size="small"
        style={{
          width: '101%',
          transform: 'translateX(-0.5%)',
        }}
      />
    </section>
  )
}

TargetingGenderSelector.propTypes = {
  genders: PropTypes.array.isRequired,
  initialGenders: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingGenderSelector.defaultProps = {
  className: null,
}


export default TargetingGenderSelector
