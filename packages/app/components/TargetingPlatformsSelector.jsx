import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import PillOptions from '@/elements/PillOptions'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import copy from '@/app/copy/targetingPageCopy'

const translateArrayToKey = (array) => {
  if (! array.length) return 'both'
  return array[0]
}

const translateKeyToArray = (key) => {
  if (key === 'both') return []
  return [key]
}

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const TargetingPlatformsSelector = ({
  options,
  initialStateRaw,
  onChange,
  className,
}) => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { platform } = optimizationPreferences

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

  return (
    <section className={[className, 'relative'].join(' ')}>
      <TargetingSectionHeader
        header="Platforms"
        description={copy.platformSelectDescription}
        className="relative mb-7"
      />
      <ControlsSettingsSectionFooter
        copy={copy.platformSelectFooter(platform)}
        className="-mt-4 mb-6 text-insta"
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
        trackComponentName="TargetingPlatformsSelector"
      />
    </section>
  )
}

TargetingPlatformsSelector.propTypes = {
  options: PropTypes.array,
  initialStateRaw: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingPlatformsSelector.defaultProps = {
  options: [],
  initialStateRaw: [],
  className: null,
}


export default TargetingPlatformsSelector
