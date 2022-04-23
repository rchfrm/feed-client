import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import useCheckObjectiveChangeStatus from '@/app/hooks/useCheckObjectiveChangeStatus'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { updateArtist, getPreferencesObject } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform, splitLinks } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
})

const ObjectiveSettingsSelector = ({
  name,
  optionValues,
  currentObjective,
  setCurrentObjective,
  setShouldShowAlert,
  setObjectiveChangeSteps,
  shouldRestoreObjective,
  setShouldRestoreObjective,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artist, setPostPreferences } = React.useContext(ArtistContext)
  const { getObjectiveChangeSteps } = useCheckObjectiveChangeStatus(currentObjective)
  const { postsPreferences, updatePreferences, nestedLinks, updateLinks, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { defaultLinkId } = postsPreferences

  React.useEffect(() => {
    const options = optionValues.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [optionValues])

  const save = async ({ objective, platform }) => {
    const hasGrowthObjective = objective === 'growth'
    let link = null
    let currentPlatform = platform

    // If we switched from a non-growth objective to a growth objective reset platform to 'facebook'
    if (hasGrowthObjective && platform === 'website') {
      currentPlatform = 'facebook'
    }

    setIsLoading(true)

    // Get integration link based on the selected platform if objective is growth, otherwise grab the first loose link
    if (hasGrowthObjective) {
      link = getLinkByPlatform(nestedLinks, currentPlatform)
    } else {
      const { looseLinks } = splitLinks(nestedLinks)
      const firstLooseLink = looseLinks[0]

      link = firstLooseLink
    }

    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      platform: currentPlatform,
      ...(objective !== 'growth' && { platform: 'website' }),
      defaultLink: link?.id || defaultLinkId,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (link) {
      // Set the new link as the default link
      updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist, newLink: link })

      // Update artist status
      setPostPreferences('default_link_id', link.id)
    }

    // Update preferences object in controls store
    updatePreferences(getPreferencesObject(updatedArtist))

    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === currentObjective[name]) return

    setCurrentObjective({ ...currentObjective, [name]: value })
  }

  React.useEffect(() => {
    const objectiveChangeSteps = getObjectiveChangeSteps()

    if (objectiveChangeSteps.length > 0) {
      setObjectiveChangeSteps(objectiveChangeSteps)
      setShouldShowAlert(true)

      return
    }
    save(currentObjective)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentObjective])

  React.useEffect(() => {
    if (shouldRestoreObjective) {
      setCurrentObjective({
        objective: optimizationPreferences.objective,
        platform: optimizationPreferences.platform,
      })

      setShouldRestoreObjective(false)
    }
  }, [shouldRestoreObjective, optimizationPreferences.objective, optimizationPreferences.platform, setShouldRestoreObjective, setCurrentObjective])

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={isLoading}
        handleChange={handleChange}
        name={name}
        selectedValue={currentObjective[name]}
        options={selectOptions}
      />
    </div>
  )
}

ObjectiveSettingsSelector.propTypes = {
  name: PropTypes.string.isRequired,
  optionValues: PropTypes.array.isRequired,
  currentObjective: PropTypes.shape({
    objective: PropTypes.string,
    platform: PropTypes.string,
  }).isRequired,
  setShouldShowAlert: PropTypes.func,
  setObjectiveChangeSteps: PropTypes.func.isRequired,
  shouldRestoreObjective: PropTypes.bool.isRequired,
  setShouldRestoreObjective: PropTypes.func.isRequired,
}

ObjectiveSettingsSelector.defaultProps = {
  setShouldShowAlert: () => {},
}

export default ObjectiveSettingsSelector
